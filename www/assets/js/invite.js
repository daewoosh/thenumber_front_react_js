(function () {

  var getActionUrl = function (id) {
    return BS.config.API_PATH + "/srv/GetInviteFullInfoPublic";
  };




  var hashSplit = [];

  var splitHashAndCheck = function () {
    try {
      hashSplit = window.document.location.hash.split("/");
    } catch (error) { }
    if (hashSplit.length != 3 || !hashSplit[1] || hashSplit[1].toLowerCase() != "inviteinfo") {
      return false;
    }
    return true;
  }

  var getInviteId = function () {
    return hashSplit[2] ? hashSplit[2] : null;
  }
  //https://developers.facebook.com/docs/sharing/webmasters#markup
  // "og:url";
  // "og:title";
  // "og:description";
  // "og:image";
  // "og:locale";
  var addMeta = function (data) {
    if (!data) return;
    const props = Object.getOwnPropertyNames(data);

    var headEl = $('head');
    for (let p in props) {
      const meta = $("<meta>");
      meta.attr('property', "og:" + props[p]);
      meta.attr('content', data[props[p]]);
      headEl.append(meta);
    }
  }

  var getImageUrl = function (detailRecommendation) {
    if (!detailRecommendation) return "";

    if (detailRecommendation.Batch && detailRecommendation.Batch.MainImageUrl) {
      return detailRecommendation.Batch.MainImageUrl;
    }

    if (detailRecommendation.ImageExtId) {
      return BS.config.API_PATH + "/srv/GetImagePublic?ImageId=" + detailRecommendation.ImageExtId;
    }
    return "";
  };

  var getMetaData = function (data) {
    res = {};

    if (!data || !data.Recommendation) return res;

    res.url = document.location;
    res.title = data.Recommendation.Batch ? data.Recommendation.Batch.Name : data.Recommendation.Title;
    res.description = data.Recommendation.Batch ? data.Recommendation.Batch.Description : data.Recommendation.Description;
    res.image = getImageUrl(data.Recommendation);
    res.locale = 'ru-RU';
    return res;
  }

  var createMeta = function (data) {
    if (!data) return;
    addMeta(getMetaData(data));
  }

  var error = "";

  var load = function () {
    var inviteId = getInviteId();
    if (!inviteId) {
      error = "inviteId is null";
      return;
    }
    $.ajax(getActionUrl(), {
      async: false,
      data: {
        inviteId: inviteId
      },
      method: "POST",
      dataType: "json"
    }).done(function (data) {
      if (!data || !data.Data || data.Error) {
        error = data.Error;
        return;
      }
      createMeta(data.Data);
    });
  }

  var run = function () {
    if (!splitHashAndCheck()) {
      return;
    }
    load();
  }
  window.rec = {};
  window.rec.run = run;

})();
window.rec.run();