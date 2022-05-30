const Util = {
  getSelectorFromElement(element) {
    var selector = element.getAttribute("data-target");
    if (!selector || selector === "#") {
      selector = element.getAttribute("href") || "";
    }

    try {
      return document.querySelector(selector) ? selector : null;
    } catch (err) {
      return null;
    }
  },
  getIdFromDropdown(element) {
    var selector = element.parentElement.getAttribute("data-id");

    try {
      return document.getElementById(selector)
        ? document.getElementById(selector)
        : null;
    } catch (err) {
      return null;
    }
  },
};

$(function () {
  $(document).on("click", '[data-toggle="show"]', function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (
      event.currentTarget.tagName === "A" &&
      $(this).data("prevent") != false
    ) {
      event.preventDefault();
    }

    const $trigger = $(this);
    const selector = Util.getSelectorFromElement(this);
    const selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      const $target = $(this);
      const $data = $trigger.data("toggle");
      $target.toggleClass($data);
      const $focus = $trigger.data("focus");
      if ($focus != "") {
        console.log("focus", $focus);
        $($focus).focus();
      }
    });
  });

  $(document).on("click", '[data-link="offset"]', function (event) {
    const $offset = $(this).data("link-offset");
    const $trigger = $(this).attr("href");
    $("html, body")
      .stop()
      .animate({ scrollTop: $($trigger).offset().top - $offset });
  });
});

$(function () {
  $(document).on("click", ".input-number-increment", function (e) {
    var quantity = $(this).parent().find("input").val();
    $(this)
      .parent()
      .find("input")
      .val(parseInt(quantity) + 1)
      .change();
  });

  $(document).on("click", ".input-number-decrement", function (e) {
    var quantity = $(this).parent().find("input").val();
    if (quantity <= 1) $(this).parent().find("input").val(1).change();
    else
      $(this)
        .parent()
        .find("input")
        .val(parseInt(quantity) - 1)
        .change();
  });
});


