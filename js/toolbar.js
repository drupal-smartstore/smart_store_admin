(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.toolbarOrientation = {
    attach: function (context) {

   // Accessing the ss_theme_setting configuration
   // Add a flag to ensure this behavior is only run once.
   if (!Drupal.behaviors.toolbarOrientation.processed) {
    // Check if toolbar_always_vertical is defined in drupalSettings
    if (drupalSettings.toolbar_always_vertical && drupalSettings.toolbar_always_vertical.ss_theme_setting) {
      const ssThemeSetting = drupalSettings.toolbar_always_vertical.ss_theme_setting;
      var bgImg = ssThemeSetting.bg_image;
      setupBackgroundImageSwitcher(bgImg);
      Drupal.behaviors.toolbarOrientation.processed = true;
    }

  }

      // Applies the 'active' class to the checked radio button's container
      function updateActiveClass() {
        $('.radio-buttons input[type="radio"]').each(function () {
          const $formItem = $(this).closest('.js-form-item');
          $formItem.toggleClass('active', $(this).is(':checked'));
        });
      }

      // Event handler for radio button changes
      function setupRadioButtons() {
        updateActiveClass();
        $('.radio-buttons input[type="radio"]', context).off('change').on('change', updateActiveClass);
      }

      // Toggles the Profile menu display
      function setupUserMenuToggle() {
        $('body #block-smart-store-admin-views-block-user-block-1 .user').off('click').on('click', function () {
          $('.menu--account').toggleClass('show');
        });
      }

      // Updates the toolbar background based on selected option
      $(".bg-image input").off('click').on("click", function () {
        setupBackgroundImageSwitcher($(this).val())
      });

      // set toolbar background
      function setupBackgroundImageSwitcher(bgImg) {
          const selectedValue = bgImg;
          const $toolbarLining = $(".toolbar-oriented .toolbar-tray-vertical > .toolbar-lining");
          const bgClasses = ["img-1-background", "img-2-background", "img-3-background", "img-4-background", "img-5-background"];
          $toolbarLining.removeClass(bgClasses.join(' ')).addClass(`img-${selectedValue.split('option')[1]}-background`);

      }

      // Toggles the settings form visibility
      function setupSettingsFormToggle() {
        $('#block-smart-store-admin-settings .rotate').off('click').on('click', function () {
          $('#block-smart-store-admin-customformblock').toggleClass('show');
        });

        $('#block-smart-store-admin-customformblock .close-button').off('click').on('click', function () {
          $('#block-smart-store-admin-customformblock').removeClass('show');
        });
      }

      // Manages theme switching and persists the preference
      function setupThemeSwitcher() {
        const isDarkTheme = localStorage.getItem('theme') === 'dark';
        $('body').toggleClass('dark-theme', isDarkTheme);
        $('#block-smart-store-admin-darktheme .moon').toggle(!isDarkTheme);
        $('#block-smart-store-admin-darktheme .sun').toggle(isDarkTheme);

        $('#block-smart-store-admin-darktheme .dark').off('click').on('click', function () {
          $('body').toggleClass('dark-theme');
          const isDarkTheme = $('body').hasClass('dark-theme');
          $('#block-smart-store-admin-darktheme .moon').toggle(!isDarkTheme);
          $('#block-smart-store-admin-darktheme .sun').toggle(isDarkTheme);
          localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        });
      }

      // Ensures the toolbar is always vertical
      function enforceVerticalToolbar() {
        const $toolbarTabs = $('.toolbar-bar .toolbar-tab #toolbar-item-administration-tray');
        if ($toolbarTabs.hasClass('toolbar-tray-horizontal')) {
          $toolbarTabs
            .removeClass('toolbar-tray-horizontal')
            .addClass('toolbar-tray-vertical')
            .closest('.toolbar-bar').find('.toolbar-item-administration-tray').addClass('hide');

          localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
          if (Drupal.toolbar.views.toolbarVisualView) {
            Drupal.toolbar.views.toolbarVisualView.model.set({ locked: true, orientation: 'vertical' }, { validate: true, override: true });
          }
        }
      }

      // Fullscreen toggle functionality
      function toggleFullscreen(elem = document.documentElement) {
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

      // Setup fullscreen toggle button
      function setupFullscreenToggle() {
        $('.button-zoom-maximize').off('click').on('click', function () {
          toggleFullscreen();
        });
      }

      // Initialize all behaviors
      setupRadioButtons();
      setupUserMenuToggle();
      setupSettingsFormToggle();
      setupThemeSwitcher();
      enforceVerticalToolbar();
      setupFullscreenToggle();
    }
  };
})(jQuery, Drupal, drupalSettings);
