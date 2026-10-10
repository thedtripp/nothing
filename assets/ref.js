// Tags Stripe buy links with the traffic source so sales are attributable.
// A visit to ?ref=tiktok sends client_reference_id=ddtripp_tiktok to Stripe.
// The ref is kept for the tab session so it survives clicks to Gift/Teams.
(function () {
  var ref = new URLSearchParams(location.search).get('ref');
  try {
    if (ref) sessionStorage.setItem('ref', ref);
    else ref = sessionStorage.getItem('ref');
  } catch (e) {}
  // Stripe allows letters, digits, - and _ (max 200 chars).
  ref = (ref || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40);
  if (!ref) return;
  document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach(function (a) {
    var url = new URL(a.href);
    url.searchParams.set('client_reference_id', 'ddtripp_' + ref);
    a.href = url.toString();
  });
})();
