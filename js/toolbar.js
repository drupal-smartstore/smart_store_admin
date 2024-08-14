//code for default vertical admin toolbar
(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.toolbarOrientation = {
      attach: function (context, settings) {
        $(document).ready(function () {
            if ($('.toolbar-bar').find('.toolbar-tab #toolbar-item-administration-tray').hasClass('toolbar-tray-horizontal')) {
                $('.toolbar-bar').find('.toolbar-tray-horizontal').each(function () {
                  $(this).removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');
                  $('toolbar-item-administration-tray').addClass('hide')
                });
                localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
                if (Drupal.toolbar.views.toolbarVisualView) {
                  Drupal.toolbar.views.toolbarVisualView.model.set({locked: true, orientation: 'vertical'}, {validate: true, override: true});
                }
              }
              $('#block-smart-store-admin-darktheme button').on('click', function (){
                console.log('clicked');
                $('body').addClass('dark-theme');
              });
              $('#block-smart-store-admin-darktheme button').on('dblclick', function () {
                console.log('double clicked');
                $('body').removeClass('dark-theme');
              });
              function toggleFullscreen(elem) {
                elem = elem || document.documentElement;

                if (!document.fullscreenElement && !document.mozFullScreenElement &&
                    !document.webkitFullscreenElement && !document.msFullscreenElement) {

                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }
            // jQuery event handler for the click event
            $('.button-zoom-maximize').on('click', function() {
                toggleFullscreen();
            });
        });
      }
    };
  })(jQuery, Drupal, drupalSettings);
