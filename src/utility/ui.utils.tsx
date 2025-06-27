export const renderStatusBadge = (statusRaw: string) => {
  const status = statusRaw?.toLowerCase();

  let bg = '';
  let text = '';

  switch (status) {
    case 'approved':
      bg = 'bg-green-100';
      text = 'text-green-700';
      break;
    case 'pending':
      bg = 'bg-yellow-100';
      text = 'text-yellow-700';
      break;
    case 'in_progress':
      bg = 'bg-blue-100';
      text = 'text-blue-700';
      break;
    case 'rejected':
      bg = 'bg-red-100';
      text = 'text-red-700';
      break;
    default:
      bg = 'bg-gray-100';
      text = 'text-gray-600';
      break;
  }

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${bg} ${text}`}
    >
      {status?.toUpperCase() || 'N/A'}
    </span>
  );
};
