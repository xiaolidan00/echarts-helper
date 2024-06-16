import proList from './pro.json';
export const line = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

export const bar = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

export const pie = {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      label: {
        show: false,
        position: 'center'
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

export const scatter = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
};

export const radar = {
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
};

export const funnel = {
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      data: [
        { value: 60, name: 'Visit' },
        { value: 40, name: 'Inquiry' },
        { value: 20, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    }
  ]
};

export const gauge = {
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18
      },
      detail: {
        valueAnimation: true,
        fontSize: 80,
        offsetCenter: [0, '70%']
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
};

export const map = {
  visualMap: {
    show: true,

    text: '高,低',
    calculable: true,
    seriesIndex: [0],
    inRange: {
      color: ['#00FFFF', '#1E90FF', '#00008B']
    }
  },
  series: [
    {
      type: 'map',
      map: '100000',
      name: '地图',
      roam: true,
      data: proList.map((it) => ({ name: it.name, value: Math.round(Math.random() * 99) })),

      label: {
        show: true,
        color: '#FFFFFF'
      },
      itemStyle: {
        areaColor: '#00FFFF'
      }
    }
  ]
};
