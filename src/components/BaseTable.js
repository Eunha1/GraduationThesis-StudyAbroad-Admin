import { Fragment } from 'react';
import { checkRoles } from '../utils/Authen';

function BaseTable({ headers, items, actions }) {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="table-auto w-full overflow-x-auto divide-y divide-dashed divide-gray-400">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-[16px] font-Roboto text-[#616161] p-2 min-w-[120px] min-h-[40px] whitespace-nowrap"
                >
                  <div className="uppercase">{header.title}</div>
                </th>
              ))}
            </tr>
          </thead>
          {items?.length > 0 ? (
            <tbody className="divide-y divide-dashed divide-gray-200">
              {items.map((item, index) => (
                <tr
                  key={index}
                  className="text-[14px] text-[#545556] font-Roboto min-w-[120px] min-h-[40px]"
                >
                  {headers.map((header, key) => (
                    <td key={key} className="p-1 tracking-wide text-center">
                      {header.key === 'image' ? (
                        <div className="flex justify-center">
                          {/* eslint-disable-next-line */}
                          <img
                            src={item[header.key]}
                            className="w-[150px] h-[100px] object-cover"
                            alt="image"
                          />
                        </div>
                      ) : (
                        <div>{item[header.key]}</div>
                      )}
                      {header.key === 'action' ? (
                        <div className="flex items-center justify-center p-0.5 cursor-pointer">
                          {' '}
                          {actions.map((action) => (
                            <Fragment key={action.key}>
                              {checkRoles(action.role) ? (
                                <div
                                  className="p-1"
                                  onClick={() => action.event(item._id)}
                                >
                                  {action.component}
                                </div>
                              ) : (
                                <></>
                              )}
                            </Fragment>
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
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="text-center p-4 font-Roboto text-[16px] tracking-wide">
                  Không có dữ liệu trong bảng !!!
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default BaseTable;
