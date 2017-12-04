const localStorageMock = (function() {
  const store = {};
  return {
    getItem: function() {
      return '{"prescriptions":[{"id":"00000001","doctorRequested":false,"pharmacistRequested":false,"doctorAllowed":false,"pharmacistAllowed":true,"medicines":[{"name":"Bruffen","qty":"1"},{"name":"Citrizine","qty":"3"}]}]}';
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });