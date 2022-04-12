import { useEffect } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column } from '../../../types/index';
import '../../../assets/styles/pages/admin/user/index.less';
import usePublicStore from "../../../store/index"

function UserAdminPage() {

  const publicStore = usePublicStore();

  useEffect(() => {
    publicStore.fetchUsers();
  }, [])

  const columns = [
    {
      key: 'email',
      title: 'Email',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'job',
      title: 'Job',
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
  ];

  return (
    <div>
      <LayoutAdmin selected={2} pageName="Users">
        <div className="main">
          <BlockAdmin className="users" blockName="Table Users">
            <Table data={publicStore.users} columns={columns} is_router_link router_builder="/admin/user" />
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default UserAdminPage;
