using ELO.ID.API.Stuff;
using ELO.ID.Application.AppServices;
using ELO.ID.Common.Const;
using ELO.ID.Domain.AggregateModels;
using ELO.ID.Domain.Services;
using ELO.ID.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using System.Reflection;
using System.Text;

var _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
var _logger = NLog.LogManager
	.Setup()
	.LoadConfigurationFromFile($"nlog.config", optional: true)
	.LoadConfigurationFromFile($"nlog.{(string.IsNullOrWhiteSpace(_environment) ? "Production" : _environment)}.config", optional: true)
	.GetCurrentClassLogger();
try
{
	Log($"Starting");

	var builder = WebApplication.CreateBuilder(args);
	var _configFrontendUri = builder.Configuration.GetValue<string>("FrontendUri");

	//#region Builder services
	//// Add services to the container.
	//builder.Services
	//    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	//    //.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection(""    )
	//    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
	//#endregion

	#region SECURITY & IDENTITY
	builder.Services
		.AddDataProtection()
		.PersistKeysToFileSystem(new DirectoryInfo(PathResolver.DataProtectionKeysPath()));

	builder.Services
		.AddDbContext<ELO.ID.Infrastructure.AppDbContext>(options =>
		{
			options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), opt => opt.MigrationsAssembly(typeof(ELO.ID.Infrastructure.AppDbContext).Assembly.GetName().Name));
		});

	builder.Services
		.AddIdentity<AppUser, AppRole>(options =>
		{
			//options.SignIn.RequireConfirmedAccount = true

			//options.SignInManager.DefaultSignInScheme = CookieAuthenticationScheme.Name;
			//options.PasswordHasher.RequiredLength = 64;
			//options.PasswordHasher.RequireNonAlphanumericCharacters = true;
			//options.PasswordHasher.RequireLowercaseCharacters = true;
			//options.PasswordHasher.RequireUppercaseCharacters = true;

			//    // Imposta la policy di sicurezza della password per il ruolo di amministratore
			//options.manager .RoleManager.RoleClaimsPrincipalFactory.GetClaimsIdentityAsync(new IdentityRole("Admin")).
			//        ConfigureAsync(claimsIdentity =>
			//        {
			//            claimsIdentity.AddClaim(new Claim(ClaimTypes.MinimumLength, "12"));
			//            claimsIdentity.AddClaim(new Claim(ClaimTypes.RequireNonAlphanumericCharacters, "true"));
			//            claimsIdentity.AddClaim(new Claim(ClaimTypes.RequireLowercaseCharacters, "true"));
			//            claimsIdentity.AddClaim(new Claim(ClaimTypes.RequireUppercaseCharacters, "true"));
			//        });

			// Imposta la policy di sicurezza della password per il ruolo di amministratore
			//options.RoleManager.RoleClaimsPrincipalFactory.GetClaimsIdentityAsync(new IdentityRole("Admin")).
			//    ConfigureAsync(claimsIdentity =>
			//    {
			//        claimsIdentity.AddClaim(new Claim(ClaimTypes.MinimumLength, "12"));
			//        claimsIdentity.AddClaim(new Claim(ClaimTypes.RequireNonAlphanumericCharacters, "true"));
			//        claimsIdentity.AddClaim(new Claim(ClaimTypes.RequireLowercaseCharacters, "true"));
			//        claimsIdentity.AddClaim(new Claim(ClaimTypes.RequireUppercaseCharacters, "true"));
			//    });
		})
		.AddRoles<AppRole>()
		//.AddUserStore<UserStore>()
		//.AddRoleStore<RoleStore>()
		.AddUserManager<ELO.ID.Domain.Managers.UserManager>()
		.AddRoleManager<ELO.ID.Domain.Managers.RoleManager>()
		.AddSignInManager<ELO.ID.Domain.Managers.SignInManager>()
		.AddEntityFrameworkStores<ELO.ID.Infrastructure.AppDbContext>()
		.AddDefaultTokenProviders()
		.AddTokenProvider<DataProtectorTokenProvider<AppUser>>(Const_JWT.Issuer)
		//.AddTokenProvider<DataProtectorTokenProvider<ELO.ID.Domain.CustomIdentity.AppUser>>(TokenOptions.DefaultProvider)
		;

	// Configura le opzioni passkey
	builder.Services.AddFido2(builder.Configuration.GetSection("Fido2"));
	//builder.Services
	//    .AddAuthorization(options =>
	//    {
	//        options.AddPolicy("EmployeeOnly", policy => policy.RequireClaim("EmployeeNumber"));
	//    });

	builder.Services.AddMemoryCache();
	builder.Services.AddDistributedMemoryCache();

	builder.Services
		.AddFido2(options =>
		{
			options.ServerDomain = new Uri(_configFrontendUri)?.Host;
			options.ServerName = "ELO.ID";
			options.Origins = new HashSet<string>() { _configFrontendUri };
			options.TimestampDriftTolerance = 10000;
			options.MDSCacheDirPath = "C:\\";
		})
		.AddCachedMetadataService(config =>
		{
			config.AddFidoMetadataRepository(httpClientBuilder =>
			{
				//TODO: any specific config you want for accessing the MDS
			});
		});
	#endregion

	#region DEPENDENCY INJECTION
	// REMEMBER ====
	// TRANSIENT:  A new instance is provided to every controller and every service
	// SCOPED:     Are the same within a request, but different across different requests
	// SINGLETON:  Are the same for every object and every request

	//builder.Services.AddScoped<IUserManager, UserManager>();

	builder.Services.AddScoped<ELO.ID.Domain.IUnitOfWork>(x => x.GetService<ELO.ID.Infrastructure.AppDbContext>());

	builder.Services.AddTransient<IEmailService, EmailService>();
	builder.Services.AddTransient<ITenantAppService, TenantAppService>();
	builder.Services.AddTransient<IAuthService, AuthService>();
	builder.Services.AddTransient<IAuthAppService, AuthAppService>();

	#endregion

	#region CORS
	builder.Services.AddCors(o => o.AddDefaultPolicy(policy =>
	{
		policy
			.AllowAnyOrigin()
			.AllowAnyMethod()
			.AllowAnyHeader();
	}));
	#endregion

	#region RATE LIMITER
#if !DEBUG
	builder.Services.AddRateLimiter(options =>
	{
		options.AddPolicy("AuthenticationStrict", httpContext =>
		{
			string? ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
			string? origin = httpContext.Request?.Headers?["TenantOrigin"].FirstOrDefault() ?? httpContext.Request?.Headers?["Referer"].FirstOrDefault() ?? "unknown";
			string key = ipAddress + "|" + origin;
			return RateLimitPartition.GetSlidingWindowLimiter(key, _ => new SlidingWindowRateLimiterOptions
			{
				Window = TimeSpan.FromMinutes(1),
				SegmentsPerWindow = 2,
				PermitLimit = 5,
				QueueLimit = 0,
			});
		});
		options.AddPolicy("AuthenticationFlow", httpContext =>
		{
			string? ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
			string? origin = httpContext.Request?.Headers?["TenantOrigin"].FirstOrDefault() ?? httpContext.Request?.Headers?["Referer"].FirstOrDefault() ?? "unknown";
			string key = ipAddress + "|" + origin;
			return RateLimitPartition.GetSlidingWindowLimiter(key, _ => new SlidingWindowRateLimiterOptions
			{
				Window = TimeSpan.FromMinutes(1),
				SegmentsPerWindow = 2,
				PermitLimit = 10,
				QueueLimit = 0,
			});
		});
	});
#endif
	#endregion

	#region JWT
	//builder.Services.Configure<JwtIssuerOptions>(options =>
	//{
	//    options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
	//    options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
	//    options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
	//});
	var tokenSecretKey = "HEth3n*Mw!ys6_2A4bZteFdu@Ff6DAth3n*Mw!ys6_";
	//var tokenSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSecretKey));
	//var tokenSigninCredentials = new SigningCredentials(tokenSecurityKey, SecurityAlgorithms.HmacSha256);

	builder.Services
		.AddAuthentication(options =>
		{
			options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		})
		.AddJwtBearer(configureOptions =>
		{
			configureOptions.IncludeErrorDetails = true;
			configureOptions.RequireHttpsMetadata = true;
			configureOptions.SaveToken = true;
			configureOptions.ClaimsIssuer = Const_JWT.Issuer; // jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
			configureOptions.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
			{
				ValidateIssuer = false, //true
				ValidateAudience = false, //true
				ValidateIssuerSigningKey = true,

				ValidIssuer = Const_JWT.Issuer, // jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],
				ValidAudience = Const_JWT.Audience_Default, // jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSecretKey)),

				RequireExpirationTime = true,
				ValidateLifetime = true,
				ClockSkew = TimeSpan.Zero
			};
			configureOptions.Events = new JwtBearerEvents
			{
				OnMessageReceived = context => { return Task.CompletedTask; },
				OnTokenValidated = context => { return Task.CompletedTask; },
				OnAuthenticationFailed = context =>
				{
					//c.NoResult();

					//Logger.LogException(c.Exception);

					//c.Response.StatusCode = 500;
					//c.Response.ContentType = "text/plain";
					//if (ApiConfig.IsDeveloping)
					//{
					//    return c.Response.WriteAsync(c.Exception.ToString());
					//}
					//return c.Response.WriteAsync("An error occured processing your authentication.");
					return Task.CompletedTask;
				},
			};
		});
	//  .AddCookie(options =>
	//  {
	//      options.ExpireTimeSpan = TimeSpan.FromHours(2);
	//      options.Cookie.MaxAge = options.ExpireTimeSpan;
	//      options.SlidingExpiration = true;
	//  });

	#endregion

	builder.Services.AddHttpContextAccessor();
	builder.Services.AddSession();
	builder.Services.AddAuthorization();
	builder.Services.AddControllers();
	// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddOpenApiDocument(opt =>
	{
		var assembly = Assembly.GetExecutingAssembly();
		opt.Title = assembly.GetCustomAttribute<AssemblyTitleAttribute>()?.Title;
		opt.Description = assembly.GetCustomAttribute<AssemblyDescriptionAttribute>()?.Description;
		opt.Version = assembly.GetName().Version?.ToString();
	});
	builder.Services.AddRateLimiter();

	// NLog: Setup NLog for Dependency injection
	builder.Logging.ClearProviders();
	builder.Host.UseNLog();

	#region +++APP+++
	var app = builder.Build();
	app.UseMiddleware<ExceptionHandlingMiddleware>();
	app.UseOpenApi();
	app.UseSwaggerUi();

	#region Applicazione delle migrazioni
	//_logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, "Starting migrations");
	using (var scope = app.Services.CreateScope())
	{
		var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
		if (context.Database.GetPendingMigrations().Any())
			await context.Database.MigrateAsync();
	}
	//_logger.Log(Microsoft.Extensions.Logging.LogLevel.Information, "End migrations");
	#endregion

	if (app.Configuration.GetValue<bool>("UseHttpsRedirection") == true) app.UseHttpsRedirection();

	if (app.Configuration.GetValue<bool>("UseForwardedHeaders") == true) app.UseForwardedHeaders(new ForwardedHeadersOptions
	{
		ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedFor | Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedProto,
		KnownIPNetworks = { }, // Accetta da qualsiasi rete
		KnownProxies = { }   // Accetta da qualsiasi proxy
	});

	app.UseRateLimiter();
	app.UseStaticFiles();
	app.UseSession();
	app.UseRouting();
	app.UseCors();
	app.UseAuthentication();
	app.UseAuthorization();
	app.MapControllers();
	app.MapGet("/info", () => new
	{
		AppName = Assembly.GetExecutingAssembly()
			?.GetCustomAttribute<AssemblyProductAttribute>()?.Product ?? "Unknown",

		AppVersion = Assembly.GetExecutingAssembly()
			?.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion
			?? Assembly.GetExecutingAssembly().GetName().Version?.ToString()
			?? "Unknown"
	});
	app.Run();
	#endregion

	Log($"Started");
}
catch (Exception exception)
{
	Log($"Stopped program because of exception: {exception.Message}", NLog.LogLevel.Error, exception);
	throw;
}
finally
{
	NLog.LogManager.Shutdown();
}

void Log(string message, NLog.LogLevel level = null, Exception exception = null)
{
	message = $"ELO.ID STARTUP | {_environment} | {message}";
	Console.WriteLine(message);
	_logger.Log(level ?? NLog.LogLevel.Info, exception, message);
}

