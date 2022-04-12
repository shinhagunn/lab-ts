import { useEffect, useState } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column, Description } from '../../../types/index';
import '../../../assets/styles/pages/admin/school/detail.less';
import usePublicStore from "../../../store/index"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ApiClient from '../../../library/ApiClient';
import AddToast from '../../../library/Toast';
import Block from '../../../components/Block';
import { changeISOTimeToMyFormTime } from '../../../mixins/helper';

function SchoolDetailAdminPage() {

  const publicStore = usePublicStore();
  const [achiName, setAchiName] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      publicStore.fetchSchool(id).then((result) => {
        if (result) {
          setName(result.name);
          setStartTime(changeISOTimeToMyFormTime(result.start_time));
          setEndTime(changeISOTimeToMyFormTime(result.end_time));
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
      key: 'description',
      title: 'Description',
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

  const navigation = useNavigate();

  const handleAdd = async () => {
    if (name === "") {
      AddToast('Error', 'Name không được để trống', 'toast');
      return
    }

    try {
      publicStore.school?.achievements.push({
        name: achiName,
        description,
        created_at: new Date().toISOString()
      })
      await new ApiClient().patch(`/schools/${id}`, {
        achievements: publicStore.school?.achievements
      })
      publicStore.fetchSchools();
      AddToast('Success', 'Add description thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add description không thành công!', 'toast');
      return error;
    }
  };

  const handleUpdate = async () => {
    if (name === "") {
      AddToast('Error', 'Name không được để trống', 'toast');
      return
    }

    if (startTime === "") {
      AddToast('Error', 'Start Time không được để trống', 'toast');
      return
    }

    if (endTime === "") {
      AddToast('Error', 'End Time không được để trống', 'toast');
      return
    }

    try {
      await new ApiClient().patch(`/schools/${id}`, {
        name,
        start_time: new Date(startTime).toISOString(), 
        end_time: new Date(endTime).toISOString(),
        updated_at: new Date().toLocaleDateString(),
      });
      AddToast('Success', 'Update school thành công!', 'toast');
      navigation("/admin/schools")
    } catch (error) {
      AddToast('Error', 'Update school không thành công!', 'toast');
      return error;
    }
  };
  
  const buttonFunc = async (index: number) => {
    try {
      publicStore.school?.achievements.splice(index, 1);
      await new ApiClient().patch(`/schools/${id}`, {
        achievements: publicStore.school?.achievements
      })
      AddToast('Success', 'Remove description thành công!', 'toast');
      publicStore.fetchSchools();
    } catch (error) {
      AddToast('Error', 'Remove description không thành công!', 'toast');
      return error;
    }
  }

  return (
    <div>
      <LayoutAdmin selected={5} pageName="Schools">
        <div className="main">
          <BlockAdmin className="skills" blockName="Add Description">
            <div className="container row flex justify-between items-end">
              <div className="col-3 ml-4">
                Name:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={achiName} onChange={(e) => setAchiName(e.target.value)} />
              </div>
              <div className="col-3 ml-4">
                Description:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
             
              <div className="col-3 flex justify-end">
                <Button className="inline-block w-28 text-center text-white bg-sky-400 border-sky-400 hover:bg-sky-500 h-10 rounded text-lg" onClick={() => handleAdd()}>Add</Button>
              </div>
            </div>
          </BlockAdmin>

          <BlockAdmin className="schools" blockName="School Detail">
            <div>
              <div className="flex justify-between items-center">
                <div className="text-2xl col-0">
                  <Input className="w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} title="Click here to change" />
                </div>
                <div className="">
                  Start Time:
                  <Input type="date" value={startTime} onChange={(e) => setStartTime(e.target.value)} title="Click here to change" />
                </div>
                <div className="">
                  End Time:
                  <Input type="date" value={endTime} onChange={(e) => setEndTime(e.target.value)} title="Click here to change" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="text">
                  <span>{`Created at: ${publicStore.school? changeISOTimeToMyFormTime(publicStore.school.created_at): ''}`}</span>
                </div>
                <div>
                  <span>{`Last updated: ${publicStore.school? changeISOTimeToMyFormTime(publicStore.school.updated_at): ''}`}</span>
                </div>
              </div>
            </div>
            <Block className="justify-end">
              <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12 text-lg " onClick={() => handleUpdate()}>Update</Button>
            </Block>
          </BlockAdmin>

          <BlockAdmin className="projects" blockName="Table Achivements">
            <Table data={publicStore.school?.achievements} columns={columns} buttonFunc={buttonFunc}/>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default SchoolDetailAdminPage;
