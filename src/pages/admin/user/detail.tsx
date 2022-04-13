import { useEffect, useState } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column, Description } from '../../../types/index';
import '../../../assets/styles/pages/admin/user/detail.less';
import usePublicStore from "../../../store/index"
import { Link, useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ApiClient from '../../../library/ApiClient';
import AddToast from '../../../library/Toast';
import Block from '../../../components/Block';
import { changeISOTimeToMyFormTime } from '../../../mixins/helper';
import Select from '../../../components/Select';

function UserDetailAdminPage() {

  const publicStore = usePublicStore();
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [job, setJob] = useState('');
  const [avatar, setAvatar] = useState<any>();
  const [url, setUrl] = useState('');
  const [favorite, setFavorite] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      publicStore.fetchUser().then((result) => {
        if (result) {
          setName(result.name);
          setBirthday(changeISOTimeToMyFormTime(result.birthday));
          setPhone(result.phone);
          setGender(result.gender);
          setAddress(result.address);
          setEmail(result.email);
          setFacebook(result.facebook);
          setJob(result.job);
          setUrl(result.avatar);
        }
      });
    }
  }, [])

  const columns = [
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'remove',
      title: 'Remove',
      align: Align.Right,
    },
  ];

  const handleAdd = async () => {
    if (favorite === "") {
      AddToast('Error', 'Favorite không được để trống', 'toast');
      return
    }

    try {
      publicStore.user?.favorites.push({
        name: favorite,
        created_at: new Date().toISOString()
      })
      await new ApiClient().patch(`/users/${id}`, {
        favorites: publicStore.user?.favorites
      })
      publicStore.fetchUser();
      AddToast('Success', 'Add favorite thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add favorite không thành công!', 'toast');
      return error;
    }
  };

  const handleUpdate = async () => {
    if (name === "") {
      AddToast('Error', 'Name không được để trống', 'toast');
      return
    }

    if (birthday === "") {
      AddToast('Error', 'Birthday không được để trống', 'toast');
      return
    }

    if (phone === "") {
      AddToast('Error', 'Phone không được để trống', 'toast');
      return
    }

    if (gender === "") {
      AddToast('Error', 'Gender không được để trống', 'toast');
      return
    }

    if (address === "") {
      AddToast('Error', 'Address không được để trống', 'toast');
      return
    }

    if (email === "") {
      AddToast('Error', 'Email không được để trống', 'toast');
      return
    }

    if (facebook === "") {
      AddToast('Error', 'Facebook không được để trống', 'toast');
      return
    }
    
    if (job === "") {
      AddToast('Error', 'Job không được để trống', 'toast');
      return
    }

    if (url === "") {
      AddToast('Error', 'Avatar không được để trống', 'toast');
      return
    }

    try {
      await new ApiClient().patch(`/users/${id}`, {
        name,
        birthday,
        phone,
        gender,
        address,
        email,
        facebook,
        job,
        avatar,
        updated_at: new Date().toISOString(),
      });
      AddToast('Success', 'Update user thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Update user không thành công!', 'toast');
      return error;
    }
  };
  
  const buttonFunc = async (index: number) => {
    try {
      publicStore.user?.favorites.splice(index, 1);
      await new ApiClient().patch(`/users/${id}`, {
        favorites: publicStore.user?.favorites
      })
      AddToast('Success', 'Remove favorite thành công!', 'toast');
      publicStore.fetchSchools();
    } catch (error) {
      AddToast('Error', 'Remove favorite không thành công!', 'toast');
      return error;
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      var file = e.target.files[0];
      console.log(file);

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result)
        setAvatar(reader.result);
      };

      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <LayoutAdmin selected={2} pageName="Users">
        <div className="main">
          <BlockAdmin className="skills" blockName="Add Favorite">
            <div className="container row flex justify-between items-end">
              <div className="col-0 ml-4">
                Name:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={favorite} onChange={(e) => setFavorite(e.target.value)} />
              </div>
             
              <div className="col-3 flex justify-end">
                <Button className="inline-block w-28 text-center text-white bg-sky-400 border-sky-400 hover:bg-sky-500 h-10 rounded text-lg" onClick={() => handleAdd()}>Add</Button>
              </div>
            </div>
          </BlockAdmin>

          <BlockAdmin className="schools" blockName="User Detail">
            <div>
              <div className="flex justify-between items-center">
                <div className="text-2xl col-4">
                  <Input className="w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} title="Click here to change" />
                </div>
                <div className="col-4">
                  Birthday:
                  <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} title="Click here to change" />
                </div>
                <div className="col-4">
                  Phone:
                  <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} title="Click here to change" />
                </div>
                <div className="col-4">
                  Gender: 
                  <Select value={gender}>
                    <div>
                      <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setGender("Nam")}>Nam</Button>
                    </div>
                    <div>
                      <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setGender("Nữ")}>Nữ</Button>
                    </div>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <div className="">
                <div className="text">
                  <span>{`Created at: ${publicStore.user? changeISOTimeToMyFormTime(publicStore.user.created_at): ''}`}</span>
                </div>
                <div>
                  <span>{`Last updated: ${publicStore.user? changeISOTimeToMyFormTime(publicStore.user.updated_at): ''}`}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="col-4">
                  Address:
                  <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} title="Click here to change" />
                </div>
                <div className="col-4">
                  Email:
                  <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} title="Click here to change" />
                </div>
                <div className="col-4">
                  Facebook:
                  <Input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} title="Click here to change" />
                </div>
                <div className="col-4">
                  Job:
                  <Input type="text" value={job} onChange={(e) => setJob(e.target.value)} title="Click here to change" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="col-3">
                <p className="font-bold">Image:</p>
                <label id="imagePre" htmlFor="upFile">
                  <img id="preview" src={url} />
                  <div className="overlay">
                    <i className="fas fa-upload text" />
                  </div>
                </label>
                <div>
                  <Input id="upFile" type="file" onChange={(e) => onFileChange(e)} />
                </div>
              </div>
            </div>
            <Block className="justify-end">
              <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12 text-lg " onClick={() => handleUpdate()}>Update</Button>
            </Block>
          </BlockAdmin>

          <BlockAdmin className="projects" blockName="Table Favorites">
            <Table data={publicStore.user?.favorites} columns={columns} buttonFunc={buttonFunc}/>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default UserDetailAdminPage;
