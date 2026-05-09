// ── FAQ ACCORDION ────────────────────────
function toggleFaq(el) {
  const item  = el.closest('.faq-item');
  const ans   = item.querySelector('.faq-a');
  const inner = item.querySelector('.faq-a-inner');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight    = '0';
    i.querySelector('.faq-a').style.paddingBottom = '0';
  });

  if (!isOpen) {
    item.classList.add('open');
    ans.style.maxHeight = inner.scrollHeight + 24 + 'px';
  }
}