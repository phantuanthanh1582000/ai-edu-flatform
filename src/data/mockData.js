export const Courses = [
  {
    id: 'c1',
    name: 'ReactJS Cơ Bản',
    price: 499000,
    image: '/assets/react.jpg',
    shortDesc: 'Học ReactJS từ cơ bản đến nâng cao.',
    category: 'frontend',
    subcategory: 'react',
  },
  {
    id: 'c2',
    name: 'VueJS Từ A đến Z',
    price: 450000,
    image: '/assets/vue.jpg',
    shortDesc: 'Khóa học dành cho người mới bắt đầu với VueJS.',
    category: 'frontend',
    subcategory: 'vue',
  },
  {
    id: 'c3',
    name: 'NodeJS Nâng Cao',
    price: 599000,
    image: '/assets/nodejs.jpg',
    shortDesc: 'Xây dựng ứng dụng backend với NodeJS.',
    category: 'backend',
    subcategory: 'nodejs',
  },
  {
    id: 'c4',
    name: 'Machine Learning Cơ Bản',
    price: 650000,
    image: '/assets/ml.jpg',
    shortDesc: 'Khóa học nhập môn học máy với Python.',
    category: 'ai',
    subcategory: 'ml',
  },
  {
    id: 'c5',
    name: 'Tiếng Anh Giao Tiếp',
    price: 850000,
    image: '/assets/english.jpg',
    shortDesc: 'Phát triển kỹ năng nói và phản xạ tiếng Anh.',
    category: 'language',
    subcategory: 'english',
  },
  {
    id: 'c6',
    name: 'Docker cho DevOps',
    price: 499000,
    image: '/assets/docker.jpg',
    shortDesc: 'Sử dụng Docker để triển khai ứng dụng.',
    category: 'devops',
    subcategory: 'docker',
  },
];


export const Categories = [
  {
    name: 'Frontend',
    value: 'frontend',
    subcategories: [
      { name: 'React', value: 'react' },
      { name: 'Vue', value: 'vue' },
      { name: 'Angular', value: 'angular' },
    ],
  },
  {
    name: 'Backend',
    value: 'backend',
    subcategories: [
      { name: 'NodeJS', value: 'nodejs' },
      { name: 'Java', value: 'java' },
      { name: 'Python', value: 'python' },
    ],
  },
  {
    name: 'AI',
    value: 'ai',
    subcategories: [
      { name: 'Machine Learning', value: 'ml' },
      { name: 'Deep Learning', value: 'dl' },
    ],
  },
  {
    name: 'Data Science',
    value: 'data-science',
    subcategories: [
      { name: 'Data Analysis', value: 'analysis' },
      { name: 'Big Data', value: 'bigdata' },
    ],
  },
  {
    name: 'DevOps',
    value: 'devops',
    subcategories: [
      { name: 'CI/CD', value: 'cicd' },
      { name: 'Docker', value: 'docker' },
    ],
  },
  {
    name: 'UI/UX',
    value: 'uiux',
    subcategories: [
      { name: 'Figma', value: 'figma' },
      { name: 'Design System', value: 'design-system' },
    ],
  },
  {
    name: 'Mobile',
    value: 'mobile',
    subcategories: [
      { name: 'React Native', value: 'react-native' },
      { name: 'Flutter', value: 'flutter' },
    ],
  },
];
