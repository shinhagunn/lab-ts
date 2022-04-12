import { useEffect, useState } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column } from '../../../types/index';
import '../../../assets/styles/pages/admin/project/index.less';
import usePublicStore from "../../../store/index"
import { Link } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ApiClient from '../../../library/ApiClient';
import AddToast from '../../../library/Toast';

function ProjectAdminPage() {

  const publicStore = usePublicStore();
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    publicStore.fetchProjects();
  }, [])

  const columns = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,
      scopedSlots: true,
    },
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
      key: 'updated_at',
      title: 'Updated At',
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
      await new ApiClient().post('/projects', {
        name,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      publicStore.fetchProjects();
      AddToast('Success', 'Add project thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add project không thành công!', 'toast');
      return error;
    }
  };

  return (
    <div>
      <LayoutAdmin selected={4} pageName="Projects">
        <div className="main">
          <BlockAdmin className="skills" blockName="Add Project">
            <div className="container row flex items-center">
              <div className="col-3">
                Name:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-3">
                Start time:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" type="date" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="col-3">
                End time:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" type="date" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
             
              <div className="col-3 flex justify-end">
                <Button className="inline-block w-28 text-center text-white bg-sky-400 border-sky-400 hover:bg-sky-500 h-10 rounded text-lg" onClick={() => handleAdd()}>Add</Button>
              </div>
            </div>
          </BlockAdmin>
          <BlockAdmin className="projects" blockName="Table Projects">
            <Table data={publicStore.projects} columns={columns} urlRemove="/projects/" is_router_link router_builder="/admin/project" />
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default ProjectAdminPage;
