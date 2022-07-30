import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './app.scss';

const schema = yup
  .object({
    firstName: yup.string().required('First Name is a required field,please fill input.'),
    age: yup.number().positive().integer().required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="container">
      <div className="container__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register('firstName')} />
          <p>{errors.firstName?.message}</p>
          <label htmlFor="age">Age</label>
          <input id="age" {...register('age')} />
          <p>{errors.age?.message}</p>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
