import { Pagination as AntPagination } from 'antd'

export default function Pagination({ total = 0, page, pageSize, onChange }) {
  return (
    <div className="mt-4 flex justify-end">
      <AntPagination
        current={page}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={onChange}
        showTotal={(count) => `${count} records`}
      />
    </div>
  )
}
