// Konami code easter-egg: Up Up Down Down Left Right Left Right B A
(function(){
  const konami = [38,38,40,40,37,39,37,39,66,65];
  let pos = 0;
  function onKey(e){
    if(e.keyCode === konami[pos]){
      pos++;
      if(pos === konami.length){
        pos = 0;
        triggerRare();
      }
    } else {
      pos = (e.keyCode === konami[0]) ? 1 : 0;
    }
  }

  function triggerRare(){
    const modal = document.getElementById('rareModal');
    if(!modal) return;
    const open = modal.getAttribute('aria-hidden') === 'false';
    modal.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('rare-active', !open);
    if(!open){
      // focus for accessibility
      const close = modal.querySelector('.rare-close');
      close && close.focus();
    }
  }

  function closeHandler(){
    const modal = document.getElementById('rareModal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('rare-active');
  }

  document.addEventListener('keydown', onKey);
  document.addEventListener('click', function(e){
    if(e.target && e.target.classList && e.target.classList.contains('rare-close')) closeHandler();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeHandler();
  });

  // also allow clicking the shimmer area to toggle (for touch)
  document.addEventListener('click', function(e){
    if(e.target && e.target.classList && e.target.classList.contains('rare-art')){
      const modal = document.getElementById('rareModal');
      if(!modal) return;
      const isOpen = modal.getAttribute('aria-hidden') === 'false';
      modal.setAttribute('aria-hidden', String(!isOpen));
      document.body.classList.toggle('rare-active', !isOpen);
    }
  });
})();
