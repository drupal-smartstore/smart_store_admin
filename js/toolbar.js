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
        });
      }
    };
  })(jQuery, Drupal, drupalSettings);
