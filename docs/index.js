function setModalContentDisplay(value) {
  $(".modal-content").css({ display: value });
}
const hideModalContentDisplay = () => setModalContentDisplay("none");
const unsetModalContentDisplay = () =>
  setTimeout(() => setModalContentDisplay("unset"), 500);

// close modals when click is outside .modal-content
$(".reveal .bg-section").on("click", (e) => {
  try {
    $(e.target).parent("div").foundation("close");
  } catch (e) {
    void 0;
  }
});
$("body").on("closed.zf.reveal", unsetModalContentDisplay);
// but don't close modals when clicks are IN the .modal-content
$(".modal-content").on("click", (e) => e.stopPropagation());
// show picture & reset when modal closed
$(".show-picture").on("click", hideModalContentDisplay);
$(".close-button").on("click", unsetModalContentDisplay);

// info-icons
$(".info-icon").on("click", () => {
  $(".info-icons").toggleClass("show");
  $(".info-icon").toggleClass("show");
});
