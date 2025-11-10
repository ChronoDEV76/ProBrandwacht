export function dashboardUrlForRequest(id: string) {
  const base =
    process.env.PB_ADMIN_BASE_URL ||
    ((process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probrandwacht.nl') + '/admin/requests');

  // strip eventuele trailing slash
  const clean = base.replace(/\/$/, '');
  return `${clean}/${id}`;
}

