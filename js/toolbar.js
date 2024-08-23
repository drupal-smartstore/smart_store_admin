//code for default vertical admin toolbar
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.toolbarOrientation = {
    attach: function (context, settings) {
  // console.log(drupalSettings.toolbar_always_vertical.ss_theme_setting.bg_image);
      // appliying actice class on js-form-item of custom form
      function updateActiveClass() {
        $('.radio-buttons input[type="radio"]').each(function () {
          $(this).closest('.js-form-item').removeClass('active');
          if ($(this).is(':checked')) {
            $(this).closest('.js-form-item').addClass('active');
          }
        });
      }
      updateActiveClass();
      $('.radio-buttons input[type="radio"]', context).on('change', function () {
        updateActiveClass();
      });
      $('body #block-smart-store-admin-views-block-user-block-1 .user').on('click', function () {
        $('.menu--account').toggleClass('show');
      });
      // setting background image on toolbar
      $(".custom-form .js-form-item input").on("click", function () {
        var selectedValue = $(this).val();
        var $toolbarLining = $(".toolbar-oriented .toolbar-tray-vertical > .toolbar-lining");
        $toolbarLining.removeClass("img-1-background img-2-background img-3-background img-4-background img-5-background");
        switch (selectedValue) {
          case 'option1':
            $toolbarLining.addClass("img-1-background");
            break;
          case 'option2':
            $toolbarLining.addClass("img-2-background");
            break;
          case 'option3':
            $toolbarLining.addClass("img-3-background");
            break;
          case 'option4':
            $toolbarLining.addClass("img-4-background");
            break;
          case 'option5':
            $toolbarLining.addClass("img-5-background");
            break;
        }
      });
      // settings form opening
      // $('#block-smart-store-admin-customformblock').hide()
      $('#block-smart-store-admin-settings .rotate').on('click', function () {
        console.log('click');
        $('#block-smart-store-admin-customformblock').toggleClass('show');
      });
      // settings form close button
      $('#block-smart-store-admin-customformblock .close-button').on('click', function () {
        $('#block-smart-store-admin-customformblock').removeClass('show');
      });
      // switching dark and light theme
      if (localStorage.getItem('theme') === 'dark') {
        $('body').addClass('dark-theme');
        $('#block-smart-store-admin-darktheme .moon').hide();
        $('#block-smart-store-admin-darktheme .sun').show();
      } else {
        $('#block-smart-store-admin-darktheme .moon').show();
        $('#block-smart-store-admin-darktheme .sun').hide();
      }
      // toolbar-always-vertical
      $(document).ready(function () {
        if ($('.toolbar-bar').find('.toolbar-tab #toolbar-item-administration-tray').hasClass('toolbar-tray-horizontal')) {
          $('.toolbar-bar').find('.toolbar-tray-horizontal').each(function () {
            $(this).removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');
            $('toolbar-item-administration-tray').addClass('hide')
          });
          localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
          if (Drupal.toolbar.views.toolbarVisualView) {
            Drupal.toolbar.views.toolbarVisualView.model.set({ locked: true, orientation: 'vertical' }, { validate: true, override: true });
          }
        }
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
        $('.button-zoom-maximize').on('click', function () {
          toggleFullscreen();
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);


jQuery(document).ready(function () {
  // console.log(drupalSettings.toolbar_always_vertical.ss_theme_setting.bg_image);

  // Toggle theme on button click and store the preference in local storage
  jQuery('#block-smart-store-admin-darktheme .dark').on('click', function () {
    jQuery('body').toggleClass('dark-theme');
    if (jQuery('body').hasClass('dark-theme')) {
      jQuery('#block-smart-store-admin-darktheme .moon').hide();
      jQuery('#block-smart-store-admin-darktheme .sun').show();
      localStorage.setItem('theme', 'dark');
    } else {
      jQuery('#block-smart-store-admin-darktheme .moon').show();
      jQuery('#block-smart-store-admin-darktheme .sun').hide();
      localStorage.setItem('theme', 'light');
    }
  });

});



