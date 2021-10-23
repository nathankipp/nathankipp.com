function setModalContentDisplay(value) {
  $('.modal-content').css({ display: value });
}

// close modals when click is outside .modal-content
$('.reveal .bg-section').on('click', (e) => {
  try {
    $(e.target).parent('div').foundation('close');
    setTimeout(() => setModalContentDisplay('unset'), 500);
  } catch (e) {
    void 0;
  }
});
// but don't close modals when clicks are IN the .modal-content
$('.modal-content').on('click', (e) => e.stopPropagation());
// show picture
$('.show-picture').on('click', () => setModalContentDisplay('none'));
