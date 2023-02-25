type CourseModel = {
  id: number;
  name: string;
  price: number;
  start_date: Date;
  end_date: Date;
  student_max: number;
  categories_id: number;
  teachers_id: number;
};

export { CourseModel };
