export const downloadExcelFile = async (url: string, filename: string) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to download file');

    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('Error downloading Excel:', error);
    alert('Failed to download Excel file.');
  }
};
