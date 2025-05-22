import React from 'react';
import { useNavigate } from 'react-router-dom';


const SidebarCalendar = ({ currentMonth, setCurrentMonth, selectedDate, onDateSelect }) => {
  
  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div
      className="rounded-2xl bg-white p-3"
      style={{
        width: 270,
        minWidth: 0,
        maxWidth: "100%",
        boxShadow: "0 1px 12px 0 #00000010",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden"
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div style={{ width: 28 }} />
        <div className="text-center flex-1" style={{ fontSize: 19, fontWeight: 500 }}>
          February
        </div>
        <div style={{ width: 28, textAlign: "right", fontSize: 14, fontWeight: 400 }}>
          2024
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-1 mb-1 text-center" style={{ color: "#888", fontSize: 13, fontWeight: 400 }}>
        {DAY_LABELS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center select-none">
        {[...Array(35)].map((_, idx) => {
          const isCurrentMonth = idx >= 2 && idx < 30;
          const day = idx - 1;
          const isSelected = day === 15;
          let faded = !isCurrentMonth;
          return (
            <div
              key={idx}
              style={{
                width: 23,
                height: 23,
                borderRadius: "50%",
                margin: "0 auto",
                background: isSelected ? "#98F5AE" : "transparent",
                color: faded ? "#ddd" : "#232323",
                fontWeight: isSelected ? 700 : 500,
                fontSize: 11,
                lineHeight: "23px",
                cursor: isCurrentMonth ? "pointer" : "default",
                transition: "background .17s"
              }}
            >
              {day > 0 && day < 30 ? day : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SidebarLogo = () => (
  <div className="flex items-center gap-2 mb-5 mt-1" style={{ minHeight: 32 }}>
    <img src="/icons/logo.png" alt="Listify logo" className="w-8 h-8" />
    <span
      className="text-xl font-extrabold uppercase"
      style={{
        color: '#000000',
        fontFamily: 'sans-serif',
        letterSpacing: '-0.5px',
        fontSize: 20,
      }}
    >
      Listify
    </span>
  </div>
);

const TopIcons = () => (
  <div className="flex items-center gap-5" style={{ marginTop: 0 }}>
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" className="text-gray-500">
      <path d="M21 15.5C20.333 15.833 19.333 16 18.5 16C14.634 16 11.5 12.866 11.5 9C11.5 7.5 12 6 12.667 5C9.5 5.5 7 8.134 7 11C7 14.314 9.686 17 13 17C15.866 17 18.5 14.5 19 11.333C19.167 12 19.333 13 19 13.667C19.333 14.5 20.333 15.167 21 15.5Z" fill="#232323"/>
    </svg>
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" className="text-gray-500">
      <path d="M11 21C12.1046 21 13 20.1046 13 19H9C9 20.1046 9.89543 21 11 21ZM17 17V11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11V17L3 19V20H19V19L17 17Z" fill="#232323"/>
    </svg>
    <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
      <img
        src="/icons/profile1.png"
        alt="Profile"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
);

const Today = ({ tasks = [] }) => {
  const navigate = useNavigate();

 
  const getTaskBg = (task, idx) =>
    idx === 0 ? '#FFF8CC' : '#E7F4FF'; 
  const getTaskBorder = (task, idx) =>
    `1.5px solid ${idx === 0 ? '#F2E291' : '#BFE2FF'}`;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans" style={{ maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden', fontSize: 15 }}>
      {/* Sidebar */}
      <aside
        className="bg-white border-r px-5 py-7 flex flex-col"
        style={{
          width: 310,
          minWidth: 0,
          maxWidth: 310,
          overflow: 'hidden',
          position: 'relative',
          top: '-12px',
        }}
      >
        <SidebarLogo />
        <div className="mb-5 flex justify-center">
          <SidebarCalendar />
        </div>
        {/* Tasks Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2" style={{fontSize:16}}>Tasks</h3>
          <ul>
            <li className="flex justify-between items-center mb-1 bg-gray-100 rounded-lg px-1 py-1">
              <span>Today</span>
              <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full" style={{fontSize:12}}>{tasks.length}</span>
            </li>
          </ul>
        </div>
        {/* Lists Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2" style={{fontSize:16}}>Lists</h3>
          <ul>
            <li className="flex justify-between items-center mb-1">
              <span style={{fontSize:14}}>Daily Routine</span>
              <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full" style={{fontSize:12}}>1</span>
            </li>
            <li className="flex justify-between items-center mb-1">
              <span style={{fontSize:14}}>Study</span>
              <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full" style={{fontSize:12}}>0</span>
            </li>
          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main
        className="flex-1 px-9 py-7 bg-white min-h-screen flex flex-col"
        style={{
          minWidth: 0,
          maxWidth: "calc(100vw - 310px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <header
          className="flex justify-between items-center w-full"
          style={{
            minHeight: '36px',
            height: '36px',
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: '0',
            marginBottom: '0',
            alignItems: 'center'
          }}
        >
          <div style={{ width: 0, height: 0 }}></div>
          <TopIcons />
        </header>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6" style={{marginTop:"10px", fontSize: 28}}>Today</h1>
        <div className="space-y-3">
          {(tasks.length === 0 ? [0,1] : tasks).map((task, idx) => (
            <div
              key={task?.id ?? idx}
              className="flex items-center px-3 py-2 rounded-lg"
              style={{
                background: getTaskBg(task, idx),
                border: getTaskBorder(task, idx),
                minHeight: 38,
                boxShadow: "0 1px 6px #00000010",
                alignItems: 'center',
                marginBottom: 0
              }}
            >
              <label style={{display:'flex',alignItems:'center',marginRight:'10px'}}>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-gray-400 border-2 border-gray-400"
                  style={{
                    border: '2px solid #ACACAC',
                    borderRadius: '5px',
                    background: '#F7F7F7',
                    width: 18,
                    height: 18,
                    marginRight: 9
                  }}
                />
              </label>
              <span className="text-[15px] font-medium" style={{color:'#383838',marginTop:2, fontSize: 16}}>
                {task?.title ?? "Read"}
              </span>
            </div>
          ))}
        </div>
        {/* Floating action button  */}
        <button
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 10,
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 8px #00000013",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            border: "1.2px solid #ddd",
            cursor: "pointer",
            transition: "box-shadow 0.2s"
          }}
          className="hover:shadow-lg"
          onClick={() => navigate('/dashboard')}
        >
          <svg width="19" height="19" viewBox="0 0 19 19">
            <circle  fill="white" stroke="#e3e3e3" strokeWidth="1"/>
            <path d="M9.5 5.5v8M5.5 9.5h8" stroke="#232323" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </main>
    </div>
  );
};

export default Today;
