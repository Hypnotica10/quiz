import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Icon, Image, Overlay } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../helper/constant";
import { handleToast } from "../helper/handleToastify";
import { listAvatarDefault } from "../helper/staticData";
import { getUserById, updateUser } from "../service/userService";
import { IAvatarDefault } from "../types/staticDataType";
import { IInformationUser } from "../types/user";

const MyProfile: React.FC = () => {
  const [informationUser, setInformationUser] = useState<IInformationUser>({
    id: undefined,
    password: "",
    username: "",
    email: "",
    name: "",
    avatar: "",
  });
  const [newValue, setNewValue] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isOverlayActive, setIsOverlayActive] = useState<boolean>(false);
  const { state, dispatch } = useAuthContext();
  const { userId } = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<"name" | "email">("email");

  useEffect(() => {
    if (userId != state?.user?.id?.toString()) {
      navigate(-1);
      return;
    }
    const getData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token") || "";
        const resJsonInformationUser = await getUserById(
          `/users/${userId}`,
          accessToken
        );
        const dataInformationUser = await resJsonInformationUser?.data;
        if (dataInformationUser) {
          setInformationUser(dataInformationUser);
          return;
        }
        handleToast("Server error", "error");
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleClickChangeAvatar = (
    _e: MouseEvent<HTMLDivElement>,
    imageUrl: string
  ) => {
    setInformationUser({
      ...informationUser,
      avatar: imageUrl,
    });
  };

  const handleOpenModal = (
    _e: MouseEvent<HTMLButtonElement>,
    label: "name" | "email"
  ) => {
    setLabel(label);
    setIsModalActive(true);
    setIsOverlayActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setTimeout(() => {
      setIsOverlayActive(false);
    }, 200);
  };

  const handleOnCloseOverlay = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setIsModalActive(false);
      setTimeout(() => {
        setIsOverlayActive(false);
      }, 200);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setInformationUser({
        ...informationUser,
        [e.target.name]: e.target.value.trim(),
      });
      return;
    }
    setNewValue({
      ...newValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickEditDone = (
    _e: MouseEvent<HTMLButtonElement>,
    label: "name" | "email"
  ) => {
    setInformationUser({
      ...informationUser,
      [label]:
        newValue[`${label}`].trim() || informationUser[`${label}`].trim(),
    });
    setNewValue({
      name: "",
      email: "",
    });
    setIsModalActive(false);
    setTimeout(() => {
      setIsOverlayActive(false);
    }, 200);
  };

  const handleClickSaveChanges = () => {
    if (!informationUser.password) {
      handleToast("Enter your password", "error");
      return;
    }
    const getData = async () => {
      const accessToken = localStorage.getItem("access_token") || "";
      const informationUserUpdate: IInformationUser = {
        id: state?.user?.id,
        username: state?.user?.username,
        password: informationUser?.password,
        email: informationUser?.email,
        name: informationUser?.name,
        avatar: informationUser?.avatar,
      };
      try {
        const resJson = await updateUser(
          "/auth/update",
          accessToken,
          informationUserUpdate
        );
        const data = await resJson?.data;
        console.log(data);

        if (data) {
          const userData = {
            id: data?.id,
            username: data?.username,
            name: data?.name,
            avatar: data?.avatar,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch({
            type: AuthActionsEnum.EDIT,
            payload: data,
          });
          handleToast("Update success", "success");
          // setInformationUser({});
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };

  return (
    <>
      <div className="pb-40 flex justify-center">
        <div className="mt-xl mb-40 max-w-45 w-full">
          <div className="flex flex-col gap-large">
            <span className="text-gray-800 font-semibold text-medium pointer-events-none">
              Your profile
            </span>
            <div className="border-2 border-gray-300 rounded-large bg-gray-100">
              <div className="p-medium flex flex-col gap-medium">
                <h3 className="font-semibold text-small">Profile picture</h3>
                <div className="flex gap-medium">
                  <div className="w-24 h-24 rounded-full flex-shrink-0">
                    <Image
                      className="w-full h-full rounded-full"
                      imageName={`${informationUser?.avatar}`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-xsmall">
                    {listAvatarDefault &&
                      listAvatarDefault.map((item: IAvatarDefault) => (
                        <div
                          key={item.id}
                          onClick={(e) =>
                            handleClickChangeAvatar(e, item.urlImage)
                          }
                          className={`${
                            item.urlImage === informationUser.avatar
                              ? "border-twilight-500"
                              : "border-transparent"
                          } w-12 h-12 rounded-full cursor-pointer border-2`}
                        >
                          <Image
                            className="w-full h-full rounded-full"
                            imageName={`${item.urlImage}`}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-300">
                <div className="p-medium flex justify-between items-center">
                  <div className="font-normal text-small">
                    <h3 className="font-semibold text-small">Username</h3>
                    <span>{informationUser?.username}</span>
                  </div>
                  <div className="">
                    <Button
                      buttonClass="py-xsmall px-medium border-2 border-transparent transition-all bg-transparent rounded-medium font-semibold text-gray-500 text-small cursor-not-allowed pointer-events-none"
                      type="button"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-300">
                <div className="p-medium flex justify-between items-center">
                  <div className="font-normal text-small">
                    <h3 className="font-semibold text-small">Email</h3>
                    <span>{informationUser?.email}</span>
                  </div>
                  <div className="">
                    <Button
                      handleClick={(e) => handleOpenModal(e, "email")}
                      buttonClass="py-xsmall px-medium border-2 border-transparent transition-all bg-transparent hover:bg-twilight-200 rounded-medium font-semibold text-twilight-500 text-small"
                      type="button"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-300">
                <div className="p-medium flex justify-between items-center">
                  <div className="font-normal text-small">
                    <h3 className="font-semibold text-small">Name</h3>
                    <span>{informationUser?.name}</span>
                  </div>
                  <div className="">
                    <Button
                      handleClick={(e) => handleOpenModal(e, "name")}
                      buttonClass="py-xsmall px-medium border-2 border-transparent transition-all bg-transparent hover:bg-twilight-200 rounded-medium font-semibold text-twilight-500 text-small"
                      type="button"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-300">
                <div className="p-medium flex flex-col gap-xsmall">
                  <h3 className="font-semibold text-small">
                    To save this setting, please enter your password
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="">
                      <label className="bg-gray-100 py-xsmall px-small h-12 rounded-medium text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bg-gray-200 before:bottom-0 before:left-0 before:transition-all focus-within:before:bg-gray-800">
                        <input
                          onChange={handleOnChange}
                          defaultValue={informationUser.password}
                          className="font-semibold text-small border-none outline-none text-gray-800"
                          type="password"
                          maxLength={255}
                          placeholder="Enter your password"
                          name="password"
                        />
                      </label>
                    </div>
                    <Button
                      handleClick={handleClickSaveChanges}
                      buttonClass="capitalize py-xsmall px-medium border-2 border-transparent transition-all bg-error-200 hover:bg-error-300 rounded-medium font-semibold text-gray-100 text-small"
                      type="button"
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOverlayActive && (
        <Overlay
          ref={overlayRef}
          isOverlayActive={isOverlayActive}
          handleOnClose={handleOnCloseOverlay}
        >
          <div className="modal-container max-w-45 w-full my-10 mx-auto">
            <div
              className={`${
                isModalActive ? "animate-fadeInDown" : "animate-fadeOutUp"
              } p-large flex flex-col bg-gray-100 rounded-large relative gap-small`}
            >
              <div
                onClick={handleCloseModal}
                className="absolute w-8 h-8 p-xsmall text-gray-600 top-small right-small cursor-pointer"
              >
                <Icon iconName="close" />
              </div>
              <h2 className="font-bold text-large text-gray-800 my-small">
                Update {label}
              </h2>
              <div className="flex-grow mb-small">
                <label className="bg-gray-100 py-xsmall px-small h-12 rounded-medium text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bg-gray-200 before:bottom-0 before:left-0 before:transition-all focus-within:before:bg-gray-800">
                  <input
                    onChange={handleOnChange}
                    value={newValue[`${label}`]}
                    className="font-semibold text-small border-none outline-none text-gray-800"
                    type="text"
                    maxLength={255}
                    placeholder={`Enter your ${label}`}
                    name={label}
                  />
                </label>
              </div>
              <Button
                handleClick={(e) => handleClickEditDone(e, label)}
                buttonClass="py-xsmall self-end px-medium border-2 border-transparent transition-all bg-transparent hover:bg-twilight-200 rounded-medium font-semibold text-twilight-500 text-small"
                type="button"
              >
                Done
              </Button>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default MyProfile;
