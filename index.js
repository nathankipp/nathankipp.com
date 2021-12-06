const ICON = {
  COMPRESS: 'fa-compress-arrows-alt',
  EXPAND: 'fa-expand-arrows-alt',
};

const pictureControls = (toggle) =>
  $('.compress-expand').toggleClass('hide', toggle);

const showWholePicture = (toggle) => {
  $('.bg-section').toggleClass('contain', toggle);
  if (toggle) {
    $(`.icon.${ICON.COMPRESS}`)
      .addClass(ICON.EXPAND)
      .removeClass(ICON.COMPRESS);
  } else {
    $(`.icon.${ICON.EXPAND}`).addClass(ICON.COMPRESS).removeClass(ICON.EXPAND);
  }
};

const setModalContentDisplay = (value) =>
  $('.modal-content').css({ display: value });
const hideModalContentDisplay = () => {
  setModalContentDisplay('none');
  pictureControls(false);
};
const unsetModalContentDisplay = () => {
  setTimeout(() => setModalContentDisplay('unset'), 500);
  pictureControls(true);
};

// close modals when click is outside .modal-content
$('.reveal .bg-section').on('click', (e) => {
  try {
    showWholePicture(false);
    $(e.target).parent('div').foundation('close');
  } catch (e) {
    void 0;
  }
});
$('.close-button').on('click', unsetModalContentDisplay);
$('body').on('closed.zf.reveal', unsetModalContentDisplay);

// but don't close modals when clicks are IN the .modal-content
$('.modal-content').on('click', (e) => e.stopPropagation());

// show picture & reset when modal closed
$('.show-picture').on('click', hideModalContentDisplay);

// allow background images to be shown without cropping
$('.compress-expand').on('click', function (e) {
  e.stopPropagation();
  const isCover = $(this).children('.icon').hasClass(ICON.COMPRESS);
  showWholePicture(isCover);
  $('.bg-section').toggleClass('contain', isCover);
});

// info-icons
$('.info-icon').on('click', () => {
  $('.info-icons').toggleClass('show');
  $('.info-icon').toggleClass('show');
});
