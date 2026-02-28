document.getElementById('actionBtn').addEventListener('click', () => {
  document.getElementById('output').textContent = 'Button clicked at ' + new Date().toLocaleTimeString();
});