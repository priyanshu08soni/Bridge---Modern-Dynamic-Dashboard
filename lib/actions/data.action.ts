"user server";

export const fetchDashboardData = async () => {
    const response = await fetch('https://api.socialverseapp.com/admin/dashboard', {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  };
  export function transformToChartData(data:any) {
    // Define colors for the chart items
    const colors = [
      "var(--color-other-1)",
      "var(--color-other-2)",
      "var(--color-other-3)",
      "var(--color-other-4)",
      "var(--color-other-5)",
    ];
  
    // Map the keys and values from the input data to the chart data format
    const chartData = Object.keys(data).map((key, index) => ({
      key,
      value: data[key],
      fill: colors[index % colors.length],
    }));
  
    return chartData;
  }