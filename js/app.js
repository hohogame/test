$(function() {
  var $navs = $("#tab-nav li");
  var divs = $("#tab-contain .mod");
  var $navbar = $("#nav-bar");

  $("#root").on("click", "#misc-btn", function() {
    var $miscNenu = $(".misc-menu-wrapper");
    window.slideout = new Slideout({
      panel: document.getElementById("panel"),
      menu: document.getElementById("menu"),
      padding: 160,
      tolerance: 70
    });
    function close(eve) {
      eve.preventDefault();
      slideout.close();
      $miscNenu.removeClass("animated fadeIn").hide();
    }
    slideout
      .on("open", function() {
        maskPanel =
          document.getElementById("mask_panel") ||
          document.getElementById("bet-box");
        maskPanel.addEventListener("click", close);
      })
      .on("beforeclose", function() {
        maskPanel =
          document.getElementById("mask_panel") ||
          document.getElementById("bet-box");
        maskPanel.removeEventListener("click", close);
      });
    slideout.toggle();
    if (slideout.isOpen()) {
      $miscNenu.addClass("animated fadeIn").show();
    } else {
      $miscNenu.removeClass("animated fadeIn").hide();
    }
  });

  $(".hbtn").on("click", function() {
    $(".welcome").hide();
  });

  $(".number-input").on("focus", "input", function(e) {
    $(this)
      .parent()
      .addClass("focus");
  });

  $(".number-input").on("blur", "input", function(e) {
    $(this)
      .parent()
      .removeClass("focus");
  });

  $("#root").on("click", "#menu-btn", function() {
    var $this = $(this);
    if ($this.hasClass("open")) {
      $this.removeClass("open").addClass("close");
      $("#menu-list2").show();
      $("body").css("overflow", "hidden");
    } else {
      $this.removeClass("close").addClass("open");
      $("#menu-list2").hide();
      $("body").css("overflow", "auto");
    }
  });

  window.addEventListener("hashchange", function() {
    $("body").css("overflow", "auto");
  });

  $("#root").on("click", "#bet-switch .btn", function(event) {
    var $this = $(this);
    if (!$this.hasClass("active")) {
      $("#bet-switch .active").removeClass("active");
      $this.addClass("active");
      if ($this.data("panel") == "history") {
        $(".section-history").show();
        $(".section-clock").hide();
        $(".section-control").hide();
      } else {
        $(".section-history").hide();
        $(".section-clock").show();
        $(".section-control").show();
      }
    }
  });

  $("#root").on("click", ".viewAll", function(event) {
    var $this = $(this);
    $this.parents(".table-body").removeClass("lb-table-more");
    $this.hide();
  });

  // 不允许输入负数
  $("input[type=number]").on("keypress", function(event) {
    if (event.keyCode == 45) {
      event.preventDefault();
    }
  });

  var clipboard = new ClipboardJS("#copy-btn");
  clipboard.on("success", function(e) {
    alert("Copy success.");
  });

  clipboard.on("error", function(e) {
    alert("Copy failed.");
  });

  var clipboard_ = new ClipboardJS("#copy-code");
  clipboard_.on("success", function(e) {
    alert("Copy success.");
  });

  clipboard_.on("error", function(e) {
    alert("Copy failed.");
  });

  //工具提示
  $("#root").on("mouseover", ".u-tooltip", function(event) {
    var $this = $(this),
      pop_section = $(".pop-section"),
      placement = $this.data("placement"),
      pageX = event.clientX,
      pageY = event.clientY;
    pop_section.css({ right: "auto", left: pageX + 15 });
    pop_section.css({ bottom: "auto", top: pageY + 15 });
    if (placement) {
      if (placement.indexOf("left") != -1) {
        pop_section.css({ left: "auto", right: pageX - 15 });
      }
      if (placement.indexOf("right") != -1) {
        pop_section.css({ right: "auto", left: pageX + 15 });
      }
      if (placement.indexOf("top") != -1) {
        pop_section.css({ top: "auto", bottom: pageY - 15 });
      }
      if (placement.indexOf("bottom") != -1) {
        pop_section.css({ bottom: "auto", top: pageY + 15 });
      }
    }
    $(".pop-section .title").text($this.data("title"));
    $(".pop-section .dec").text($this.data("dec"));
    pop_section.show();
  });

  $("#root").on("mouseout", ".u-tooltip", function(event) {
    $(".pop-section").hide();
    $(".pop-section .title").text("");
    $(".pop-section .dec").text("");
  });

  $("#root").after(
    `<div class="pop-section"><div class="content"><h2 class="title"></h2><p class="dec"></p></div></div>`
  );

  for (var i = 0; i < $navs.length; i++) {
    $navs[i].title = i;
    $navs[i].onclick = function() {
      for (var j = 0; j < $navs.length; j++) {
        $($navs[j]).removeClass("active");
        $(divs[j]).hide();
      }
      $(this).addClass("active");
      $(divs[this.title]).show();
    };
  }
});
