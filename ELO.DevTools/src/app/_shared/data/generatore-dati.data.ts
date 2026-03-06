export const NOMI_MASCHILI = [
    'Marco', 'Luca', 'Giuseppe', 'Giovanni', 'Alessandro', 'Andrea', 'Francesco', 'Matteo',
    'Lorenzo', 'Davide', 'Simone', 'Federico', 'Stefano', 'Roberto', 'Antonio', 'Fabio',
    'Paolo', 'Massimo', 'Daniele', 'Riccardo', 'Claudio', 'Sergio', 'Emanuele', 'Nicola',
    'Alberto', 'Filippo', 'Michele', 'Gabriele', 'Mario', 'Luigi', 'Vincenzo', 'Salvatore',
    'Pietro', 'Angelo', 'Enrico', 'Bruno', 'Carlo', 'Franco', 'Giorgio', 'Gianluca',
    'Tommaso', 'Edoardo', 'Leonardo', 'Giacomo', 'Valerio', 'Diego', 'Cristiano', 'Raffaele',
    'Domenico', 'Maurizio'
];

export const NOMI_FEMMINILI = [
    'Maria', 'Anna', 'Giulia', 'Francesca', 'Sara', 'Laura', 'Valentina', 'Chiara',
    'Alessia', 'Martina', 'Elisa', 'Silvia', 'Paola', 'Federica', 'Elena', 'Roberta',
    'Monica', 'Simona', 'Claudia', 'Daniela', 'Barbara', 'Cristina', 'Stefania', 'Michela',
    'Sabrina', 'Serena', 'Veronica', 'Ilaria', 'Giorgia', 'Marta', 'Arianna', 'Beatrice',
    'Sofia', 'Alice', 'Aurora', 'Camilla', 'Giada', 'Irene', 'Lucia', 'Rosa',
    'Teresa', 'Angela', 'Carla', 'Rita', 'Patrizia', 'Manuela', 'Antonella', 'Giuseppina',
    'Emanuela', 'Caterina'
];

export const COGNOMI = [
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci',
    'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa',
    'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Santoro', 'Mariani',
    'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone', 'Longo', 'Gentile',
    'Martinelli', 'Vitale', 'Lombardo', 'Serra', 'Coppola', 'De Santis', 'D\'Angelo', 'Marchetti',
    'Parisi', 'Villa', 'Conte', 'Ferraro', 'Ferri', 'Fabbri', 'Bianco', 'Marini',
    'Grasso', 'Valentini', 'Messina', 'Sala', 'De Angelis', 'Gatti', 'Pellegrini', 'Palumbo',
    'Sanna', 'Farina', 'Rizzi', 'Monti', 'Cattaneo', 'Morelli', 'Amato', 'Silvestri',
    'Mazza', 'Testa', 'Grassi', 'Pellegrino', 'Carbone', 'Giuliani', 'Benedetti', 'Barone',
    'Rossetti', 'Caputo', 'Montanari', 'Guerra', 'Palmieri', 'Bernardi', 'Martino', 'Fiore'
];

export const VIE_TIPI = ['Via', 'Viale', 'Corso', 'Piazza', 'Largo', 'Vicolo', 'Piazzale', 'Strada'];

export const VIE_NOMI = [
    'Roma', 'Milano', 'Garibaldi', 'Mazzini', 'Dante', 'Vittorio Emanuele', 'Cavour',
    'Matteotti', 'Verdi', 'Marconi', 'Gramsci', 'della Repubblica', 'della Libertà',
    'Nazionale', 'Europa', 'Kennedy', 'XX Settembre', 'IV Novembre', 'dei Mille',
    'delle Rose', 'della Pace', 'Leopardi', 'Pascoli', 'Carducci', 'Petrarca',
    'San Francesco', 'del Popolo', 'Colombo', 'Piave', 'Trieste', 'Trento',
    'Amendola', 'De Gasperi', 'Togliatti', 'Pertini', 'Einaudi', 'Gramsci',
    'della Stazione', 'del Commercio', 'dell\'Industria', 'Boccaccio', 'Tasso',
    'Manzoni', 'Foscolo', 'D\'Annunzio', 'Montale', 'Ungaretti', 'Galilei', 'Da Vinci'
];

export interface ProvinciaInfo {
    sigla: string;
    nome: string;
    capRange: [number, number];
    prefissoTelefonico: string;
}

export const PROVINCE: ProvinciaInfo[] = [
    { sigla: 'AG', nome: 'Agrigento', capRange: [92010, 92100], prefissoTelefonico: '0922' },
    { sigla: 'AL', nome: 'Alessandria', capRange: [15010, 15122], prefissoTelefonico: '0131' },
    { sigla: 'AN', nome: 'Ancona', capRange: [60010, 60131], prefissoTelefonico: '071' },
    { sigla: 'AO', nome: 'Aosta', capRange: [11010, 11100], prefissoTelefonico: '0165' },
    { sigla: 'AR', nome: 'Arezzo', capRange: [52010, 52100], prefissoTelefonico: '0575' },
    { sigla: 'AP', nome: 'Ascoli Piceno', capRange: [63010, 63100], prefissoTelefonico: '0736' },
    { sigla: 'AT', nome: 'Asti', capRange: [14010, 14100], prefissoTelefonico: '0141' },
    { sigla: 'AV', nome: 'Avellino', capRange: [83010, 83100], prefissoTelefonico: '0825' },
    { sigla: 'BA', nome: 'Bari', capRange: [70010, 70132], prefissoTelefonico: '080' },
    { sigla: 'BT', nome: 'Barletta-Andria-Trani', capRange: [76011, 76125], prefissoTelefonico: '0883' },
    { sigla: 'BL', nome: 'Belluno', capRange: [32010, 32100], prefissoTelefonico: '0437' },
    { sigla: 'BN', nome: 'Benevento', capRange: [82010, 82100], prefissoTelefonico: '0824' },
    { sigla: 'BG', nome: 'Bergamo', capRange: [24010, 24129], prefissoTelefonico: '035' },
    { sigla: 'BI', nome: 'Biella', capRange: [13811, 13900], prefissoTelefonico: '015' },
    { sigla: 'BO', nome: 'Bologna', capRange: [40010, 40141], prefissoTelefonico: '051' },
    { sigla: 'BZ', nome: 'Bolzano', capRange: [39010, 39100], prefissoTelefonico: '0471' },
    { sigla: 'BS', nome: 'Brescia', capRange: [25010, 25136], prefissoTelefonico: '030' },
    { sigla: 'BR', nome: 'Brindisi', capRange: [72010, 72100], prefissoTelefonico: '0831' },
    { sigla: 'CA', nome: 'Cagliari', capRange: [9010, 9134], prefissoTelefonico: '070' },
    { sigla: 'CL', nome: 'Caltanissetta', capRange: [93010, 93100], prefissoTelefonico: '0934' },
    { sigla: 'CB', nome: 'Campobasso', capRange: [86010, 86100], prefissoTelefonico: '0874' },
    { sigla: 'CE', nome: 'Caserta', capRange: [81010, 81100], prefissoTelefonico: '0823' },
    { sigla: 'CT', nome: 'Catania', capRange: [95010, 95131], prefissoTelefonico: '095' },
    { sigla: 'CZ', nome: 'Catanzaro', capRange: [88010, 88100], prefissoTelefonico: '0961' },
    { sigla: 'CH', nome: 'Chieti', capRange: [66010, 66100], prefissoTelefonico: '0871' },
    { sigla: 'CO', nome: 'Como', capRange: [22010, 22100], prefissoTelefonico: '031' },
    { sigla: 'CS', nome: 'Cosenza', capRange: [87010, 87100], prefissoTelefonico: '0984' },
    { sigla: 'CR', nome: 'Cremona', capRange: [26010, 26100], prefissoTelefonico: '0372' },
    { sigla: 'KR', nome: 'Crotone', capRange: [88900, 88908], prefissoTelefonico: '0962' },
    { sigla: 'CN', nome: 'Cuneo', capRange: [12010, 12100], prefissoTelefonico: '0171' },
    { sigla: 'EN', nome: 'Enna', capRange: [94010, 94100], prefissoTelefonico: '0935' },
    { sigla: 'FM', nome: 'Fermo', capRange: [63811, 63900], prefissoTelefonico: '0734' },
    { sigla: 'FE', nome: 'Ferrara', capRange: [44010, 44124], prefissoTelefonico: '0532' },
    { sigla: 'FI', nome: 'Firenze', capRange: [50010, 50145], prefissoTelefonico: '055' },
    { sigla: 'FG', nome: 'Foggia', capRange: [71010, 71122], prefissoTelefonico: '0881' },
    { sigla: 'FC', nome: 'Forlì-Cesena', capRange: [47010, 47122], prefissoTelefonico: '0543' },
    { sigla: 'FR', nome: 'Frosinone', capRange: [3010, 3100], prefissoTelefonico: '0775' },
    { sigla: 'GE', nome: 'Genova', capRange: [16010, 16167], prefissoTelefonico: '010' },
    { sigla: 'GO', nome: 'Gorizia', capRange: [34070, 34170], prefissoTelefonico: '0481' },
    { sigla: 'GR', nome: 'Grosseto', capRange: [58010, 58100], prefissoTelefonico: '0564' },
    { sigla: 'IM', nome: 'Imperia', capRange: [18010, 18100], prefissoTelefonico: '0183' },
    { sigla: 'IS', nome: 'Isernia', capRange: [86070, 86170], prefissoTelefonico: '0865' },
    { sigla: 'SP', nome: 'La Spezia', capRange: [19010, 19137], prefissoTelefonico: '0187' },
    { sigla: 'AQ', nome: 'L\'Aquila', capRange: [67010, 67100], prefissoTelefonico: '0862' },
    { sigla: 'LT', nome: 'Latina', capRange: [4010, 4100], prefissoTelefonico: '0773' },
    { sigla: 'LE', nome: 'Lecce', capRange: [73010, 73100], prefissoTelefonico: '0832' },
    { sigla: 'LC', nome: 'Lecco', capRange: [23801, 23900], prefissoTelefonico: '0341' },
    { sigla: 'LI', nome: 'Livorno', capRange: [57010, 57128], prefissoTelefonico: '0586' },
    { sigla: 'LO', nome: 'Lodi', capRange: [26811, 26900], prefissoTelefonico: '0371' },
    { sigla: 'LU', nome: 'Lucca', capRange: [55010, 55100], prefissoTelefonico: '0583' },
    { sigla: 'MC', nome: 'Macerata', capRange: [62010, 62100], prefissoTelefonico: '0733' },
    { sigla: 'MN', nome: 'Mantova', capRange: [46010, 46100], prefissoTelefonico: '0376' },
    { sigla: 'MS', nome: 'Massa-Carrara', capRange: [54010, 54100], prefissoTelefonico: '0585' },
    { sigla: 'MT', nome: 'Matera', capRange: [75010, 75100], prefissoTelefonico: '0835' },
    { sigla: 'ME', nome: 'Messina', capRange: [98010, 98168], prefissoTelefonico: '090' },
    { sigla: 'MI', nome: 'Milano', capRange: [20010, 20162], prefissoTelefonico: '02' },
    { sigla: 'MO', nome: 'Modena', capRange: [41010, 41126], prefissoTelefonico: '059' },
    { sigla: 'MB', nome: 'Monza e Brianza', capRange: [20812, 20900], prefissoTelefonico: '039' },
    { sigla: 'NA', nome: 'Napoli', capRange: [80010, 80147], prefissoTelefonico: '081' },
    { sigla: 'NO', nome: 'Novara', capRange: [28010, 28100], prefissoTelefonico: '0321' },
    { sigla: 'NU', nome: 'Nuoro', capRange: [8010, 8100], prefissoTelefonico: '0784' },
    { sigla: 'OR', nome: 'Oristano', capRange: [9070, 9170], prefissoTelefonico: '0783' },
    { sigla: 'PD', nome: 'Padova', capRange: [35010, 35143], prefissoTelefonico: '049' },
    { sigla: 'PA', nome: 'Palermo', capRange: [90010, 90151], prefissoTelefonico: '091' },
    { sigla: 'PR', nome: 'Parma', capRange: [43010, 43126], prefissoTelefonico: '0521' },
    { sigla: 'PV', nome: 'Pavia', capRange: [27010, 27100], prefissoTelefonico: '0382' },
    { sigla: 'PG', nome: 'Perugia', capRange: [6010, 6134], prefissoTelefonico: '075' },
    { sigla: 'PU', nome: 'Pesaro e Urbino', capRange: [61010, 61122], prefissoTelefonico: '0721' },
    { sigla: 'PE', nome: 'Pescara', capRange: [65010, 65129], prefissoTelefonico: '085' },
    { sigla: 'PC', nome: 'Piacenza', capRange: [29010, 29122], prefissoTelefonico: '0523' },
    { sigla: 'PI', nome: 'Pisa', capRange: [56010, 56128], prefissoTelefonico: '050' },
    { sigla: 'PT', nome: 'Pistoia', capRange: [51010, 51100], prefissoTelefonico: '0573' },
    { sigla: 'PN', nome: 'Pordenone', capRange: [33070, 33170], prefissoTelefonico: '0434' },
    { sigla: 'PZ', nome: 'Potenza', capRange: [85010, 85100], prefissoTelefonico: '0971' },
    { sigla: 'PO', nome: 'Prato', capRange: [59010, 59100], prefissoTelefonico: '0574' },
    { sigla: 'RG', nome: 'Ragusa', capRange: [97010, 97100], prefissoTelefonico: '0932' },
    { sigla: 'RA', nome: 'Ravenna', capRange: [48010, 48124], prefissoTelefonico: '0544' },
    { sigla: 'RC', nome: 'Reggio Calabria', capRange: [89010, 89135], prefissoTelefonico: '0965' },
    { sigla: 'RE', nome: 'Reggio Emilia', capRange: [42010, 42124], prefissoTelefonico: '0522' },
    { sigla: 'RI', nome: 'Rieti', capRange: [2010, 2100], prefissoTelefonico: '0746' },
    { sigla: 'RN', nome: 'Rimini', capRange: [47814, 47924], prefissoTelefonico: '0541' },
    { sigla: 'RM', nome: 'Roma', capRange: [10, 199], prefissoTelefonico: '06' },
    { sigla: 'RO', nome: 'Rovigo', capRange: [45010, 45100], prefissoTelefonico: '0425' },
    { sigla: 'SA', nome: 'Salerno', capRange: [84010, 84135], prefissoTelefonico: '089' },
    { sigla: 'SS', nome: 'Sassari', capRange: [7010, 7100], prefissoTelefonico: '079' },
    { sigla: 'SV', nome: 'Savona', capRange: [17010, 17100], prefissoTelefonico: '019' },
    { sigla: 'SI', nome: 'Siena', capRange: [53010, 53100], prefissoTelefonico: '0577' },
    { sigla: 'SR', nome: 'Siracusa', capRange: [96010, 96100], prefissoTelefonico: '0931' },
    { sigla: 'SO', nome: 'Sondrio', capRange: [23010, 23100], prefissoTelefonico: '0342' },
    { sigla: 'SU', nome: 'Sud Sardegna', capRange: [9010, 9069], prefissoTelefonico: '0781' },
    { sigla: 'TA', nome: 'Taranto', capRange: [74010, 74123], prefissoTelefonico: '099' },
    { sigla: 'TE', nome: 'Teramo', capRange: [64010, 64100], prefissoTelefonico: '0861' },
    { sigla: 'TR', nome: 'Terni', capRange: [5010, 5100], prefissoTelefonico: '0744' },
    { sigla: 'TO', nome: 'Torino', capRange: [10010, 10156], prefissoTelefonico: '011' },
    { sigla: 'TP', nome: 'Trapani', capRange: [91010, 91100], prefissoTelefonico: '0923' },
    { sigla: 'TN', nome: 'Trento', capRange: [38010, 38123], prefissoTelefonico: '0461' },
    { sigla: 'TV', nome: 'Treviso', capRange: [31010, 31100], prefissoTelefonico: '0422' },
    { sigla: 'TS', nome: 'Trieste', capRange: [34010, 34151], prefissoTelefonico: '040' },
    { sigla: 'UD', nome: 'Udine', capRange: [33010, 33100], prefissoTelefonico: '0432' },
    { sigla: 'VA', nome: 'Varese', capRange: [21010, 21100], prefissoTelefonico: '0332' },
    { sigla: 'VE', nome: 'Venezia', capRange: [30010, 30176], prefissoTelefonico: '041' },
    { sigla: 'VB', nome: 'Verbano-Cusio-Ossola', capRange: [28801, 28925], prefissoTelefonico: '0323' },
    { sigla: 'VC', nome: 'Vercelli', capRange: [13010, 13100], prefissoTelefonico: '0161' },
    { sigla: 'VR', nome: 'Verona', capRange: [37010, 37142], prefissoTelefonico: '045' },
    { sigla: 'VV', nome: 'Vibo Valentia', capRange: [89811, 89900], prefissoTelefonico: '0963' },
    { sigla: 'VI', nome: 'Vicenza', capRange: [36010, 36100], prefissoTelefonico: '0444' },
    { sigla: 'VT', nome: 'Viterbo', capRange: [1010, 1100], prefissoTelefonico: '0761' }
];

export interface FormaGiuridica {
    codice: string;
    descrizione: string;
    sigla: string;
    tipo: 'persona_fisica' | 'impresa_individuale' | 'societa';
}

export const FORME_GIURIDICHE: FormaGiuridica[] = [
    { codice: 'DI', descrizione: 'Ditta Individuale', sigla: 'D.I.', tipo: 'impresa_individuale' },
    { codice: 'SNC', descrizione: 'Società in Nome Collettivo', sigla: 'S.N.C.', tipo: 'societa' },
    { codice: 'SAS', descrizione: 'Società in Accomandita Semplice', sigla: 'S.A.S.', tipo: 'societa' },
    { codice: 'SRL', descrizione: 'Società a Responsabilità Limitata', sigla: 'S.R.L.', tipo: 'societa' },
    { codice: 'SRLS', descrizione: 'Società a Responsabilità Limitata Semplificata', sigla: 'S.R.L.S.', tipo: 'societa' },
    { codice: 'SPA', descrizione: 'Società per Azioni', sigla: 'S.P.A.', tipo: 'societa' },
    { codice: 'SAPA', descrizione: 'Società in Accomandita per Azioni', sigla: 'S.A.P.A.', tipo: 'societa' },
    { codice: 'SCRL', descrizione: 'Società Cooperativa a Responsabilità Limitata', sigla: 'S.C.R.L.', tipo: 'societa' },
    { codice: 'SS', descrizione: 'Società Semplice', sigla: 'S.S.', tipo: 'societa' },
    { codice: 'CONS', descrizione: 'Consorzio', sigla: 'CONS.', tipo: 'societa' }
];

export interface CodiceAteco {
    codice: string;
    descrizione: string;
    nace: string;
}

export const CODICI_ATECO: CodiceAteco[] = [
    { codice: '01.11.10', descrizione: 'Coltivazione di cereali (escluso il riso)', nace: '01.11' },
    { codice: '10.71.10', descrizione: 'Produzione di pane; prodotti di pasticceria freschi', nace: '10.71' },
    { codice: '25.11.00', descrizione: 'Fabbricazione di strutture metalliche e parti assemblate', nace: '25.11' },
    { codice: '41.20.00', descrizione: 'Costruzione di edifici residenziali e non residenziali', nace: '41.20' },
    { codice: '43.21.01', descrizione: 'Installazione di impianti elettrici', nace: '43.21' },
    { codice: '43.22.01', descrizione: 'Installazione di impianti idraulici', nace: '43.22' },
    { codice: '45.11.01', descrizione: 'Commercio all\'ingrosso e al dettaglio di autovetture', nace: '45.11' },
    { codice: '46.31.10', descrizione: 'Commercio all\'ingrosso di frutta e ortaggi freschi', nace: '46.31' },
    { codice: '46.49.10', descrizione: 'Commercio all\'ingrosso di articoli di abbigliamento', nace: '46.49' },
    { codice: '47.11.10', descrizione: 'Ipermercati', nace: '47.11' },
    { codice: '47.19.10', descrizione: 'Grandi magazzini', nace: '47.19' },
    { codice: '47.21.01', descrizione: 'Commercio al dettaglio di frutta e verdura fresca', nace: '47.21' },
    { codice: '47.71.10', descrizione: 'Commercio al dettaglio di confezioni per adulti', nace: '47.71' },
    { codice: '49.41.00', descrizione: 'Trasporto di merci su strada', nace: '49.41' },
    { codice: '55.10.00', descrizione: 'Alberghi', nace: '55.10' },
    { codice: '56.10.11', descrizione: 'Ristorazione con somministrazione', nace: '56.10' },
    { codice: '56.10.30', descrizione: 'Gelaterie e pasticcerie', nace: '56.10' },
    { codice: '56.30.00', descrizione: 'Bar e altri esercizi simili senza cucina', nace: '56.30' },
    { codice: '62.01.00', descrizione: 'Produzione di software non connesso all\'edizione', nace: '62.01' },
    { codice: '62.02.00', descrizione: 'Consulenza nel settore delle tecnologie dell\'informatica', nace: '62.02' },
    { codice: '62.09.09', descrizione: 'Altre attività dei servizi connessi alle tecnologie informatiche', nace: '62.09' },
    { codice: '63.11.11', descrizione: 'Elaborazione elettronica di dati contabili', nace: '63.11' },
    { codice: '64.19.10', descrizione: 'Intermediazione monetaria di istituti diversi dalle banche centrali', nace: '64.19' },
    { codice: '68.20.01', descrizione: 'Locazione immobiliare di beni propri', nace: '68.20' },
    { codice: '68.31.00', descrizione: 'Attività di mediazione immobiliare', nace: '68.31' },
    { codice: '69.10.10', descrizione: 'Attività degli studi legali', nace: '69.10' },
    { codice: '69.20.11', descrizione: 'Servizi forniti da dottori commercialisti', nace: '69.20' },
    { codice: '69.20.30', descrizione: 'Attività dei consulenti del lavoro', nace: '69.20' },
    { codice: '70.22.09', descrizione: 'Altre attività di consulenza imprenditoriale', nace: '70.22' },
    { codice: '71.12.10', descrizione: 'Attività degli studi di ingegneria', nace: '71.12' },
    { codice: '71.12.20', descrizione: 'Servizi di progettazione di ingegneria integrata', nace: '71.12' },
    { codice: '73.11.01', descrizione: 'Ideazione di campagne pubblicitarie', nace: '73.11' },
    { codice: '74.10.21', descrizione: 'Attività dei disegnatori grafici di pagine web', nace: '74.10' },
    { codice: '77.11.00', descrizione: 'Autonoleggio', nace: '77.11' },
    { codice: '80.10.00', descrizione: 'Servizi di vigilanza privata', nace: '80.10' },
    { codice: '81.21.00', descrizione: 'Pulizia generale di edifici', nace: '81.21' },
    { codice: '85.59.20', descrizione: 'Corsi di formazione e aggiornamento professionale', nace: '85.59' },
    { codice: '86.10.10', descrizione: 'Ospedali e case di cura generici', nace: '86.10' },
    { codice: '86.21.00', descrizione: 'Servizi degli studi medici di medicina generale', nace: '86.21' },
    { codice: '86.23.00', descrizione: 'Attività degli studi odontoiatrici', nace: '86.23' },
    { codice: '93.11.10', descrizione: 'Gestione di stadi', nace: '93.11' },
    { codice: '93.13.00', descrizione: 'Gestione di palestre', nace: '93.13' },
    { codice: '96.02.01', descrizione: 'Servizi dei saloni di barbiere e parrucchiere', nace: '96.02' },
    { codice: '96.02.02', descrizione: 'Servizi degli istituti di bellezza', nace: '96.02' },
    { codice: '96.09.09', descrizione: 'Altre attività di servizi per la persona', nace: '96.09' }
];

export interface CodiceSAE {
    codice: string;
    descrizione: string;
}

export const CODICI_SAE: CodiceSAE[] = [
    { codice: '600', descrizione: 'Famiglie consumatrici' },
    { codice: '612', descrizione: 'Famiglie produttrici con meno di 6 addetti' },
    { codice: '613', descrizione: 'Famiglie produttrici con 6-20 addetti' },
    { codice: '614', descrizione: 'Famiglie produttrici con più di 20 addetti' },
    { codice: '310', descrizione: 'Società in nome collettivo' },
    { codice: '320', descrizione: 'Società in accomandita semplice' },
    { codice: '410', descrizione: 'Società a responsabilità limitata' },
    { codice: '420', descrizione: 'Società per azioni' },
    { codice: '430', descrizione: 'Società in accomandita per azioni' },
    { codice: '440', descrizione: 'Società cooperative' },
    { codice: '460', descrizione: 'Società di mutua assicurazione' },
    { codice: '470', descrizione: 'Consorzi di diritto privato' },
    { codice: '480', descrizione: 'Altre forme di società' }
];

export interface CodiceRAE {
    codice: string;
    descrizione: string;
}

export const CODICI_RAE: CodiceRAE[] = [
    { codice: '01010', descrizione: 'Prodotti dell\'agricoltura e della caccia' },
    { codice: '02010', descrizione: 'Prodotti della silvicoltura' },
    { codice: '05010', descrizione: 'Prodotti della pesca e dell\'acquicoltura' },
    { codice: '10010', descrizione: 'Prodotti delle miniere di carbone' },
    { codice: '15010', descrizione: 'Prodotti alimentari e bevande' },
    { codice: '17010', descrizione: 'Prodotti tessili' },
    { codice: '20010', descrizione: 'Legno e prodotti in legno' },
    { codice: '22010', descrizione: 'Editoria, stampa e riproduzione' },
    { codice: '24010', descrizione: 'Prodotti chimici' },
    { codice: '25010', descrizione: 'Articoli in gomma e materie plastiche' },
    { codice: '28010', descrizione: 'Prodotti in metallo' },
    { codice: '29010', descrizione: 'Macchine ed apparecchi meccanici' },
    { codice: '30010', descrizione: 'Macchine per ufficio ed elaboratori' },
    { codice: '31010', descrizione: 'Macchine e apparecchi elettrici' },
    { codice: '34010', descrizione: 'Autoveicoli, rimorchi e semirimorchi' },
    { codice: '45010', descrizione: 'Costruzioni' },
    { codice: '50010', descrizione: 'Commercio e riparazioni auto e moto' },
    { codice: '51010', descrizione: 'Commercio all\'ingrosso e intermediari' },
    { codice: '52010', descrizione: 'Commercio al dettaglio' },
    { codice: '55010', descrizione: 'Alberghi e ristoranti' },
    { codice: '60010', descrizione: 'Trasporti terrestri' },
    { codice: '64010', descrizione: 'Poste e telecomunicazioni' },
    { codice: '65010', descrizione: 'Intermediazione finanziaria' },
    { codice: '70010', descrizione: 'Attività immobiliari' },
    { codice: '72010', descrizione: 'Informatica e attività connesse' },
    { codice: '74010', descrizione: 'Altre attività professionali e imprenditoriali' },
    { codice: '80010', descrizione: 'Istruzione' },
    { codice: '85010', descrizione: 'Sanità e assistenza sociale' },
    { codice: '90010', descrizione: 'Smaltimento rifiuti e depurazione' },
    { codice: '92010', descrizione: 'Attività ricreative, culturali e sportive' },
    { codice: '93010', descrizione: 'Altre attività dei servizi' }
];

export const RAGIONI_SOCIALI_PREFISSI = [
    'Alfa', 'Beta', 'Delta', 'Gamma', 'Omega', 'Euro', 'Ital', 'Med', 'Tech', 'Global',
    'Prima', 'Nuova', 'Generale', 'Centrale', 'Italiana', 'Moderna', 'Rapida', 'Nord', 'Sud', 'Centro'
];

export const RAGIONI_SOCIALI_SUFFISSI = [
    'Service', 'Group', 'Consulting', 'Solutions', 'Trading', 'Costruzioni', 'Trasporti',
    'Immobiliare', 'Servizi', 'Alimentari', 'Edilizia', 'Meccanica', 'Elettronica',
    'Informatica', 'Engineering', 'Logistica', 'Distribuzione', 'Commerciale', 'Industriale', 'System'
];
