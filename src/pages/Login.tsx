import {useState} from "react";
import {Button} from "../components/share/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/hooks.ts";
import {userAdd} from "../reducers/userSlice.tsx";
import {Modal} from "../components/share/Modal.tsx";
import {inputClassName} from "../constants/constants.tsx";
import {PATHS} from "../router/constants.ts";

export const Login = () => {
  const [mail, setMail] = useState<string>("your@mail.com")
  const [password, setPassword] = useState<string>("")
  const [modalVisibility, setModalVisibility] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const closeModal  =()=>{
    setModalVisibility(false)
  }

  const onClickHandler = (url: string) => {
    console.log("hola")
    navigate(url);
  }

  const checkMail = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    })
    return await response.json()
  }

  const onSubmitLogin = async (e: { preventDefault: () => void; }) => {
    setModalVisibility(true)
    e.preventDefault()
    try {
      const user = await checkMail("http://localhost:8080/api/user/mailVerification/" + mail)
      dispatch(userAdd(user))
      navigate(PATHS.dashboard)
      console.log("mail exist");
    } catch (error) {
      console.log("mail no exist");
    }
  }

  return (
    <main className={"bg-[url('../../public/bg-login.png')] bg-cover h-screen w-full flex flex-col justify-center items-center"}>
      <Modal closeModal={closeModal} visibility={modalVisibility}>
        aaaaaaaaaaaaa
      </Modal>
      <div
        className={"bg-white sm:w-96 w-80 h-fit  border-primary-1/15 border-2    flex flex-col rounded-2xl shadow-2xl"}>
        <h1 className={'text-4xl m-5'}>Login</h1>
        <div className={" h-full m-5 flex flex-col justify-between"}>
          <form className={"h-64 flex flex-col justify-around disabled:invisible"} onSubmit={onSubmitLogin}>
            <div className={"rounded-2xl"}>
              <label>Email</label>
              <input type={"email"}
                     placeholder={"your@mail.com"}
                     onChange={(e) => {
                       e.currentTarget.required = true

                       setMail(e.currentTarget.value)
                     }}
                     className={inputClassName}/>
            </div>

            <div className={" rounded-2xl"}>
              <label>Password</label>
              <input type={"password"} placeholder={"***********"}
                     value={password} onChange={(e) => {
                e.currentTarget.required = true
                setPassword(e.currentTarget.value)
              }}
                     className={inputClassName}/>

            </div>
            <div className={"h-fit my-2 flex-col justify-between"}>
              <div className={"flex justify-between"}>
                <Button

                  type={"submit"}
                  className={"h-10 bg-white rounded-2xl border-primary-2 border-2 hover:bg-primary-1 hover:text-white  w-3/12"}
                >Log In
                </Button>
                <Button
                  url={PATHS.register}
                  type={"button"}
                  className={"h-10 bg-white rounded-2xl border-primary-2 border-2   w-3/12 transition ease-in-out delay-50 hover:bg-primary-1 hover:text-white duration-300"}
                  onClickLink={onClickHandler}>Register
                </Button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </main>
  )
}