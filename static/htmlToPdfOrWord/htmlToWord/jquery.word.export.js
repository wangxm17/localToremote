//导入js文件
// let saveAs = require('./FileSaver')
// let $ = require('../jquery')
import saveAs from  './FileSaver'
import $ from 'jquery'

if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
  (function() {
    $.fn.wordExport = function(fileName,rules) {
      fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
      var static_ = {
        mhtml: {
          top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
          head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
          body: "<body>_body_</body>"
        }
      };
      var options = {
        maxWidth: 624
      };
      // Clone selected element before manipulating it
      var markup = $(this).clone();

      // Remove hidden elements from the output
      markup.each(function() {
        var self = $(this);
        if (self.is(':hidden'))
          self.remove();
      });

      // Embed all images using Data URLs
      var images = Array();
      var img = markup.find('img');
      for (var i = 0; i < img.length; i++) {
        //如果导出的word文件里面包含线上的图片
        // Calculate dimensions of output image
        var width = Math.min(img[i].width, options.maxWidth);
        var height = img[i].height * (width / img[i].width);
        // Create canvas for converting image to data URL
        //这是添加的代码--------------------------------------------
        var img_id = "#"+img[i].id;
        $('<canvas>').attr("id", "test_word_img_" + i).width(width).height(height).insertAfter(img_id);

        /*
        //如果导出的word文件里面包含本地图片用这一段，如果都包含，要另外研究一下
        // Calculate dimensions of output image
         var w = Math.min(img[i].width, options.maxWidth);
         var h = img[i].height * (w / img[i].width);
         // Create canvas for converting image to data URL
         var canvas = document.createElement("CANVAS");
         canvas.width = w;
         canvas.height = h;
         // Draw image to canvas
         var context = canvas.getContext('2d');
         context.drawImage(img[i], 0, 0, w, h);
         // Get data URL encoding of image
         var uri = canvas.toDataURL("image/png");
         $(img[i]).attr("src", img[i].src);
         img[i].width = w;
         img[i].height = h;
         // Save encoded image to array
         images[i] = {
             type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
             encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
             location: $(img[i]).attr("src"),
             data: uri.substring(uri.indexOf(",") + 1)
         };
         */
      }

      // Prepare bottom of mhtml file with image data
      var mhtmlBottom = "\n";
      for (var i = 0; i < images.length; i++) {
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
        mhtmlBottom += "Content-Location: " + images[i].location + "\n";
        mhtmlBottom += "Content-Type: " + images[i].type + "\n";
        mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        mhtmlBottom += images[i].data + "\n\n";
      }
      mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

      //TODO: load css from included stylesheet
      var styles = rules;

      // Aggregate parts of the file together
      var fileContent = static_.mhtml.top.replace("_html_", static_.mhtml.head.replace("_styles_", styles) + static_.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

      // Create a Blob with the file contents
      var blob = new Blob([fileContent], {
        type: "application/msword;charset=utf-8"
      });
      saveAs.saveAs(blob, fileName + ".doc");
    };
  })(jQuery);
} else {
  if (typeof jQuery === "undefined") {
    console.error("jQuery Word Export: missing dependency (jQuery)");
  }
  if (typeof saveAs === "undefined") {
    console.error("jQuery Word Export: missing dependency (FileSaver.js)");
  }
}
