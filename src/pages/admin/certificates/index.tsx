import { useEffect, useState } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column } from '../../../types/index';
import '../../../assets/styles/pages/admin/project/index.less';
import usePublicStore from "../../../store/index"
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import AddToast from '../../../library/Toast';
import ApiClient from '../../../library/ApiClient';

function CertificateAdminPage() {

  const publicStore = usePublicStore();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    publicStore.fetchCertificates();
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
      key: 'year',
      title: 'Year',
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
      align: Align.Left,
      isTime: true,
    },
  ];

  const handleAdd = async () => {
    if (name === "") {
      AddToast("Error","Bạn phải nhập tên", "toast");
      return;
    }

    if (year === "") {
      AddToast("Error","Bạn phải nhập năm", "toast");
      return;
    }
    
    try {
      await new ApiClient().post('/certificates', {
        name,
        year: Number(year),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      publicStore.fetchCertificates();
      AddToast('Success', 'Add certificate thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add certificate không thành công!', 'toast');
      return error;
    }
  };

  return (
    <div>
      <LayoutAdmin selected={6} pageName="Certificates">
        <div className="main">
          <BlockAdmin className="skills" blockName="Add Skill">
            <div className="container row flex items-center">
              <div className="col-3">
                Name:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-3">
                Year:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
              <div className="col-3 flex justify-end">
                <Button className="inline-block w-28 text-center text-white bg-sky-400 border-sky-400 hover:bg-sky-500 h-10 rounded text-lg" onClick={() => handleAdd()}>Add</Button>
              </div>
            </div>
          </BlockAdmin>
          <BlockAdmin className="certificates" blockName="Table Certificates">
            <Table data={publicStore.certificates} urlRemove="/certificates/" columns={columns} is_router_link router_builder="/admin/certificate" />
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default CertificateAdminPage;
