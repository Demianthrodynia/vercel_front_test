import './FormContainer.css'

  <div className="formContainerContainer">
    <InputText
      type={"email"}
      className={"basicInput"}
      placeholder={""}
      name={"email"}
      handler={inputHandler}
    />

    <InputText
      type={"password"}
      className={"basicInput"}
      placeholder={""}
      name={"password"}
      handler={inputHandler}
    />
    <button className="formContainerButtonDesign" onClick={loginHandler}>
      Log me in!
    </button>
  </div>
