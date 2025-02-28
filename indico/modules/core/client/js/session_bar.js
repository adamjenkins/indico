// This file is part of Indico.
// Copyright (C) 2002 - 2023 CERN
//
// Indico is free software; you can redistribute it and/or
// modify it under the terms of the MIT License; see the
// LICENSE file for more details.

(function() {
  function setupProtection() {
    $('#protection-details-link').qtip({
      style: {
        width: '280px',
        classes: 'qtip-rounded qtip-shadow qtip-popup',
        tip: {
          corner: true,
          width: 20,
          height: 15,
        },
      },
      position: {
        my: 'top center',
        at: 'bottom center',
      },
      content: $('#protection-details'),
      show: {
        event: 'click',
        effect() {
          $(this).fadeIn(300);
        },
      },
      hide: {
        event: 'unfocus click',
        fixed: true,
        effect() {
          $(this).fadeOut(300);
        },
      },
    });
  }

  function setupTimezone() {
    const widget = $('#tz-selector-widget');
    widget.on('change', 'input[name=tz_mode]', function() {
      const customTZ = this.value === 'custom';
      const customTZSelect = widget.find('select[name=tz]');
      customTZSelect.prop('disabled', !customTZ);
      if (customTZ) {
        customTZSelect.focus();
        scrollToCurrentTZ();
      }
    });

    $('#tz-selector-link').qtip({
      style: {
        width: '300px',
        classes: 'qtip-rounded qtip-shadow qtip-popup qtip-timezone',
        tip: {
          corner: true,
          width: 20,
          height: 15,
        },
      },
      position: {
        my: 'top center',
        at: 'bottom center',
      },
      content: widget,
      show: {
        event: 'click',
        effect() {
          $(this).fadeIn(300);
        },
      },
      hide: {
        event: 'unfocus click',
        fixed: true,
        effect() {
          $(this).fadeOut(300);
        },
      },
      events: {
        show() {
          _.defer(scrollToCurrentTZ);
        },
      },
    });

    function scrollToCurrentTZ() {
      const option = widget.find('select[name=tz] option:selected')[0];
      if (option) {
        option.scrollIntoView(false);
      }
    }
  }

  function setupUserSettings() {
    const link = $('#user-settings-link');

    $('#user-settings-widget a:not([data-toggle=dropdown])').on('click', function() {
      link.qtip('hide');
    });

    link.qtip({
      style: {
        minWidth: '200px',
        classes: 'qtip-rounded qtip-shadow qtip-popup qtip-allow-overflow',
        tip: {
          corner: true,
          width: 20,
          height: 15,
        },
      },
      position: {
        my: 'top center',
        at: 'bottom center',
      },
      content: $('#user-settings-widget'),
      show: {
        event: 'click',
        effect() {
          $(this).fadeIn(300);
        },
      },
      hide: {
        event: 'unfocus click',
        fixed: true,
        effect() {
          $(this).fadeOut(300);
        },
      },
    });
  }

  $(document).ready(function() {
    setupProtection();
    setupTimezone();
    setupUserSettings();
  });
})();
