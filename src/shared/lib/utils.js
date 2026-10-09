export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(amount) {
  if (typeof amount === 'string') return amount
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
