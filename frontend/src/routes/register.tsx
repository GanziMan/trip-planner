import { Input } from '@/compoennts/Input'
import { createFileRoute } from '@tanstack/react-router'
import { useFormik } from 'formik'
export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const initialValues: { email: string; name: string; password: string } = {
    email: '',
    name: '',
    password: '',
  }

  const { errors, touched, handleChange, handleSubmit } = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: initialValues,

    validate: (values) => {
      const errors: { email?: string; name?: string; password?: string } = {}
      if (!values.email) {
        errors.email = '이메일을 입력하세요'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = '유효한 이메일 주소를 입력하세요'
      }
      if (!values.name) {
        errors.name = '이름을 입력하세요'
      }
      if (!values.password) {
        errors.password = '비밀번호를 입력하세요'
      } else if (values.password.length < 6) {
        errors.password = '비밀번호는 6자 이상이어야 합니다'
      }
      return errors
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  console.log(errors)
  return (
    <>
      <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
        <div className="p-6 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-semibold text-center">회원가입</h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              onChange={handleChange}
            />

            {touched.email && errors.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
            <Input
              label="Name"
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              onChange={handleChange}
            />
            {touched.name && errors.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700"
              >
                회원가입
              </button>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              아이디가 있다면?{' '}
              <a href="/login" className="font-medium hover:underline">
                로그인
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
