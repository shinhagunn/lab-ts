import { useEffect } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column } from '../../../types/index';
import '../../../assets/styles/pages/admin/user/index.less';

function UserAdminPage() {

  const columns = [
    {
      key: 'uid',
      title: 'UID',
      align: Align.Left,
    },
    {
      key: 'email',
      title: 'Email',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'state',
      title: 'State',
      align: Align.Left,
    },
    {
      key: 'role',
      title: 'Role',
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
            {/* <Table data={AdminStore.users} columns={columns} is_router_link router_builder="/dashboard/users" /> */}
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default UserAdminPage;
