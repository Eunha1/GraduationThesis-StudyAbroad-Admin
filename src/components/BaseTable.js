function BaseTable({ headers, items, actions }) {
  return (
    <table className="table-auto w-full overflow-x-scroll divide-y divide-dashed divide-gray-400">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="text-[16px] font-Roboto text-[#616161] p-2 "
            >
              <div className="uppercase">{header.title}</div>
            </th>
          ))}
        </tr>
      </thead>
      {items?.length > 0 ? (
        <tbody className="divide-y divide-dashed divide-gray-200">
          {items.map((item, index) => (
            <tr key={index}>
              {headers.map((header, key) => (
                <td
                  key={key}
                  className="p-1 text-[14px] text-[#545556] font-Roboto tracking-wide text-center"
                >
                  <div>{item[header.key]}</div>
                  {header.key === 'action' ? (
                    <div className="flex items-center justify-center p-0.5 cursor-pointer">
                      {' '}
                      {actions.map((action) => (
                        <div
                          key={action.key}
                          onClick={() => action.event(item._id)}
                        >
                          {action.component}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td className="text-center p-4 font-Roboto text-[16px] tracking-wide">
              Không có dữ liệu trong bảng !!!
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}

export default BaseTable;
