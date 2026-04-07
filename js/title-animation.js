// Title and browser tab management
(function(){
  const baseTitle = 'Psi. Camila Borges';
  const offFocusTitle = '📞 Agende sua consulta!';
  let savedTitle = document.title;

  // Set initial title
  document.title = baseTitle;

  // Change title on blur/focus for engagement
  window.addEventListener('blur', function(){
    savedTitle = document.title;
    document.title = offFocusTitle;
  });

  window.addEventListener('focus', function(){
    document.title = baseTitle;
  });
})();
