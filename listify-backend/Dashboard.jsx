import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Calendar component styled like the image
function SidebarCalendar({ currentMonth, setCurrentMonth, selectedDate, onDateSelect }) {
  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function getMonthMatrix(monthDate) {
    const startMonth = startOfMonth(monthDate);
    const endMonth = endOfMonth(monthDate);
    let startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
    const endDateObj = endOfWeek(endMonth, { weekStartsOn: 1 });
    const matrix = [];
    let week = [];
    let curr = startDate;

    while (curr <= endDateObj) {
      for (let i = 0; i < 7; i++) {
        week.push({
          date: curr,
          isCurrentMonth: isSameMonth(curr, monthDate)
        });
        curr = addDays(curr, 1);
      }
      matrix.push(week);
      week = [];
    }
    return matrix;
  }

  const monthMatrix = getMonthMatrix(currentMonth);

  return (
    <div
      className="rounded-2xl bg-white p-4"
      style={{
        width: 320,
        minWidth: 0,
        maxWidth: "100%",
        boxShadow: "0 1px 12px 0 #00000010",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div style={{ width: 40 }} />
        <div className="text-center flex-1" style={{ fontSize: 22, fontWeight: 500 }}>
          {format(currentMonth, "MMMM")}
        </div>
        <div style={{ width: 40, textAlign: "right", fontSize: 16, fontWeight: 400 }}>
          {format(currentMonth, "yyyy")}
        </div>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-y-1 mb-1 text-center" style={{ color: "#888", fontSize: 15, fontWeight: 400 }}>
        {DAY_LABELS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-1 text-center select-none">
        {monthMatrix.flat().map((cell, idx) => {
          let isSelected =
            selectedDate &&
            format(cell.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          let faded = !cell.isCurrentMonth;
          return (
            <div
              key={idx}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                margin: "0 auto",
                background: isSelected ? "#98F5AE" : "transparent",
                color: faded ? "#ddd" : "#232323",
                fontWeight: isSelected ? 700 : 500,
                fontSize: 13,
                lineHeight: "32px",
                cursor: cell.isCurrentMonth ? "pointer" : "default",
                transition: "background .17s"
              }}
              onClick={() => {
                if (cell.isCurrentMonth && onDateSelect) onDateSelect(cell.date);
              }}
            >
              {format(cell.date, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const COLOR_OPTIONS = [
  '#E2F0CB', '#FFDAC1', '#FFFACD', '#B5EAD7', '#C7CEEA', '#A8E6CF',
  '#FFD3B6', '#DCEDC1', '#FFFFB3', '#A2D2FF', '#F5A3FF', '#FF0000', '#D3D3D3'
];

const TopIcons = () => (
  <div className="flex items-center gap-7" style={{ marginTop: 0 }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-gray-500">
      <path d="M21 15.5C20.333 15.833 19.333 16 18.5 16C14.634 16 11.5 12.866 11.5 9C11.5 7.5 12 6 12.667 5C9.5 5.5 7 8.134 7 11C7 14.314 9.686 17 13 17C15.866 17 18.5 14.5 19 11.333C19.167 12 19.333 13 19 13.667C19.333 14.5 20.333 15.167 21 15.5Z" fill="#232323"/>
    </svg>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-gray-500">
      <path d="M11 21C12.1046 21 13 20.1046 13 19H9C9 20.1046 9.89543 21 11 21ZM17 17V11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11V17L3 19V20H19V19L17 17Z" fill="#232323"/>
    </svg>
    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
      <img
        src="/icons/profile1.png"
        alt="Profile"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
);

const SidebarLogo = () => (
  <div className="flex items-center gap-3 mb-8 mt-2" style={{ minHeight: 40 }}>
    <img src="/icons/logo.png" alt="Listify logo" className="w-10 h-10" />
    <span
      className="text-2xl font-extrabold uppercase"
      style={{
        color: '#000000',
        fontFamily: 'sans-serif',
        letterSpacing: '-0.5px'
      }}
    >
      Listify
    </span>
  </div>
);

const underlineInputStyle = {
  width: '100%',
  border: 'none',
  borderBottom: '2px solid #e5e7eb',
  borderRadius: 0,
  backgroundColor: '#f9fafb',
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '16px',
  outline: 'none',
  boxShadow: 'none',
  marginBottom: '2px',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box'
};

const underlineInputActiveStyle = {
  borderBottom: '2px solid #3b82f6',
};

const Dashboard = ({ tasks = [], setTasks = () => {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: COLOR_OPTIONS[0],
    repeat: 'None',
    tags: ['Daily Routine', 'Study Routine'],
  });
  const [tagInput, setTagInput] = useState('');
  const [addingTag, setAddingTag] = useState(false);
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState('Daily');
  const [selectedDays, setSelectedDays] = useState([]);
  const [focusField, setFocusField] = useState(null);
  const navigate = useNavigate();

  // Calendar State for sidebar calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
    }
    setTagInput('');
    setAddingTag(false);
  };

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...formData, id: tasks.length + 1, date: new Date().toISOString() };
    setTasks([...tasks, newTask]);
    setFormData({
      title: '',
      description: '',
      color: COLOR_OPTIONS[0],
      repeat: 'None',
      tags: ['Daily Routine', 'Study Routine'],
    });
    setRepeatEnabled(false);
    setSelectedCycle('Daily');
    setSelectedDays([]);
    navigate('/today');
  };

  // Renders "Daily Routine", "Add More +", "Study Routine" as oval chips, smaller font if needed
  const renderTagChips = () => {
    const { tags } = formData;
    const otherTags = tags.filter(tag => tag !== 'Daily Routine' && tag !== 'Study Routine');
    const ovalStyle = {
      padding: '2px 12px',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      fontWeight: 500,
      fontSize: '13px',
      color: '#444',
      background: '#fff',
      height: '28px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '2px',
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
      minWidth: '0'
    };
    return (
      <div className="flex items-center gap-2" style={{ minHeight: 32 }}>
        <span style={ovalStyle}>Daily Routine</span>
        {!addingTag && (
          <button
            type="button"
            onClick={() => setAddingTag(true)}
            className="rounded-full border border-gray-300 text-gray-800"
            style={{
              ...ovalStyle,
              background: '#fff',
              border: '1px solid #e5e7eb',
              cursor: 'pointer'
            }}
          >
            Add More +
          </button>
        )}
        {addingTag && (
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={handleAddTag}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddTag();
              } else if (e.key === 'Escape') {
                setAddingTag(false);
                setTagInput('');
              }
            }}
            autoFocus
            className="border border-gray-300 rounded px-2 py-1"
            style={{
              fontSize: '13px',
              height: 28,
              minWidth: 70,
              marginRight: 4
            }}
            placeholder="New tag"
          />
        )}
        <span style={ovalStyle}>Study Routine</span>
        {otherTags.map((tag, idx) => (
          <span key={tag + idx} style={ovalStyle}>{tag}</span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="flex min-h-screen bg-gray-100 font-sans"
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <aside
        className="bg-white border-r px-6 py-8 flex flex-col"
        style={{
          width: 380,
          minWidth: 0,
          maxWidth: 380,
          overflow: 'hidden',
          position: 'relative',
          top: '-18px',
        }}
      >
        <SidebarLogo />
        <div className="mb-8 flex justify-center">
          <SidebarCalendar
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
        {/* Tasks Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks</h3>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span>Today</span>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">2</span>
            </li>
          </ul>
        </div>
        {/* Lists Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Lists</h3>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span>Daily Routine</span>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">1</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>Study</span>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">0</span>
            </li>
          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main
        className="flex-1 px-10 py-8 bg-white min-h-screen flex flex-col"
        style={{
          minWidth: 0,
          maxWidth: "calc(100vw - 380px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <header
          className="flex justify-between items-center w-full"
          style={{
            minHeight: '40px',
            height: '40px',
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: '-10px',
            marginBottom: '0',
            alignItems: 'center'
          }}
        >
          <div style={{ width: 0, height: 0 }}></div>
          <TopIcons />
        </header>
        {/* New Task Heading */}
        <div
          className="flex items-center mb-6"
          style={{
            minHeight: 82,
            alignItems: 'center',
            marginTop: "24px"
          }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            New Task
            <span className="ml-2 align-middle flex items-center" style={{ height: '32px' }}>
              <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.8953 12.4502H30.1687C30.4031 13.1534 30.5671 13.8799 30.6609 14.6299C30.8015 15.3799 30.8718 16.1534 30.8718 16.9502C30.8718 19.0127 30.4734 20.958 29.6765 22.7862C28.9265 24.5674 27.8484 26.1612 26.4421 27.5674C25.0828 28.9268 23.489 30.0049 21.6609 30.8018C19.8796 31.5518 17.9578 31.9268 15.8953 31.9268C13.8328 31.9268 11.8875 31.5518 10.0593 30.8018C8.2312 30.0049 6.63745 28.9268 5.27808 27.5674C3.9187 26.1612 2.84058 24.5674 2.0437 22.7862C1.2937 20.958 0.918701 19.0127 0.918701 16.9502C0.918701 14.8877 1.2937 12.9659 2.0437 11.1846C2.84058 9.35648 3.9187 7.76273 5.27808 6.40335C6.63745 4.9971 8.2312 3.91898 10.0593 3.16898C11.8875 2.3721 13.8328 1.97366 15.8953 1.97366C16.9734 1.97366 18.0046 2.09085 18.989 2.32523C20.0203 2.51273 20.9812 2.81741 21.8718 3.23929V9.42679H24.8953V12.4502ZM21.1687 10.9737C20.5125 10.9737 19.9734 11.1846 19.5515 11.6065C19.1296 12.0284 18.9187 12.5674 18.9187 13.2237C18.9187 13.833 19.1296 14.3721 19.5515 14.8409C19.9734 15.2627 20.5125 15.4737 21.1687 15.4737C21.7781 15.4737 22.2937 15.2627 22.7156 14.8409C23.1843 14.3721 23.4187 13.833 23.4187 13.2237C23.4187 12.5674 23.1843 12.0284 22.7156 11.6065C22.2937 11.1846 21.7781 10.9737 21.1687 10.9737ZM10.6218 10.9737C10.0125 10.9737 9.47339 11.1846 9.00464 11.6065C8.58276 12.0284 8.37183 12.5674 8.37183 13.2237C8.37183 13.833 8.58276 14.3721 9.00464 14.8409C9.47339 15.2627 10.0125 15.4737 10.6218 15.4737C11.2781 15.4737 11.8171 15.2627 12.239 14.8409C12.6609 14.3721 12.8718 13.833 12.8718 13.2237C12.8718 12.5674 12.6609 12.0284 12.239 11.6065C11.8171 11.1846 11.2781 10.9737 10.6218 10.9737ZM15.8953 25.1768C17.6296 25.1768 19.1765 24.6846 20.5359 23.7002C21.9421 22.7159 22.95 21.4737 23.5593 19.9737H8.2312C8.84058 21.4737 9.82495 22.7159 11.1843 23.7002C12.5906 24.6846 14.1609 25.1768 15.8953 25.1768ZM30.8718 3.45023V0.426788H27.9187V3.45023H24.8953V6.47366H27.9187V9.42679H30.8718V6.47366H33.8953V3.45023H30.8718Z" fill="black"/>
              </svg>
            </span>
          </h1>
        </div>
        {/* Task Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6 flex flex-col flex-1">
          {/* Title Field */}
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => setFocusField('title')}
              onBlur={() => setFocusField(null)}
              required
              style={{
                ...underlineInputStyle,
                ...(focusField === 'title' ? underlineInputActiveStyle : {}),
              }}
              placeholder="Name your new task"
            />
          </div>
          {/* Description Field */}
          <div className="relative">
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              onFocus={() => setFocusField('description')}
              onBlur={() => setFocusField(null)}
              required
              style={{
                ...underlineInputStyle,
                ...(focusField === 'description' ? underlineInputActiveStyle : {}),
              }}
              placeholder="Describe your new task"
            />
          </div>
          {/* Card Color Selection */}
          <div>
            <h3 className="text-lg font-medium mb-2">Card Color</h3>
            <div
              className="flex flex-wrap"
              style={{
                gap: '20px',
                paddingLeft: '2px',
                paddingTop: '2px',
                marginBottom: '4px'
              }}
            >
              {COLOR_OPTIONS.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full`}
                  style={{
                    backgroundColor: color,
                    border: formData.color === color ? '2px solid black' : 'none',
                    boxSizing: 'border-box'
                  }}
                />
              ))}
            </div>
          </div>
          {/* Repeat and Tag Section */}
          <div
            className="flex gap-8 bg-gray-50 rounded-lg shadow-sm"
            style={{
              boxShadow: '0px 6px 36px 0px #00000033',
              borderRadius: '10px',
              border: 'none',
              padding: '32px 32px 28px 32px',
              minHeight: '260px',
              marginTop: '22px'
            }}
          >
            {/* Repeat Section */}
            <div className="flex-1 pr-8" style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '18px', marginBottom: 4 }}>Repeat</div>
              <div style={{ color: '#444', marginBottom: 8, fontSize: 14 }}>Set a cycle for your task
                <span className="float-right">
                  <label style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 32,
                    height: 18,
                    verticalAlign: 'middle'
                  }}>
                    <input
                      type="checkbox"
                      style={{ opacity: 0, width: 0, height: 0 }}
                      checked={repeatEnabled}
                      onChange={() => setRepeatEnabled(!repeatEnabled)}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: repeatEnabled ? '#222' : '#e5e7eb',
                      borderRadius: 12,
                      transition: '.3s'
                    }}></span>
                    <span style={{
                      position: 'absolute',
                      left: repeatEnabled ? '16px' : '2px',
                      top: '2px',
                      width: '14px',
                      height: '14px',
                      background: '#fff',
                      borderRadius: '50%',
                      transition: '.3s',
                      boxShadow: '0 1px 3px #0001'
                    }}></span>
                  </label>
                </span>
              </div>
              {/* Divider after Set a cycle */}
              <div style={{
                borderBottom: '2px solid #e5e7eb',
                margin: '8px 0 18px 0',
                width: '100%'
              }} />
              {/* Cycle buttons */}
              <div>
                <div className="flex w-full gap-3 mb-0">
                  {['Daily', 'Weekly', 'Monthly'].map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setSelectedCycle(cycle)}
                      style={{
                        background: selectedCycle === cycle ? '#222' : '#e5e7eb',
                        color: selectedCycle === cycle ? '#fff' : '#444',
                        border: 'none',
                        padding: '10px 36px',
                        borderRadius: '20px',
                        fontWeight: 500,
                        fontSize: 16,
                        marginRight: '16px',
                        minWidth: 104,
                        transition: 'all 0.2s'
                      }}
                    >
                      {cycle}
                    </button>
                  ))}
                </div>
                {/* Divider line after cycle buttons */}
                <div style={{
                  borderBottom: '2px solid #e5e7eb',
                  margin: '14px 0 14px 0',
                  width: '100%'
                }} />
              </div>
              {/* Days for weekly */}
              {repeatEnabled && selectedCycle === 'Weekly' && (
                <div>
                  <div className="flex gap-3 mb-0">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDaySelection(day)}
                        style={{
                          background: selectedDays.includes(day) ? '#e5e7eb' : '#fff',
                          border: selectedDays.includes(day) ? '2px solid #bdbdbd' : '2px solid #e5e7eb',
                          color: '#444',
                          borderRadius: '16px',
                          fontWeight: 500,
                          fontSize: 13,
                          padding: '6px 0',
                          width: 42,
                          height: 32,
                          lineHeight: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 0,
                          textAlign: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  {/* Divider line after days row */}
                  <div style={{
                    borderBottom: '2px solid #e5e7eb',
                    margin: '14px 0 14px 0',
                    width: '100%'
                  }} />
                </div>
              )}
              {/* Repeat summary row */}
              <div className="flex justify-between items-center" style={{
                borderBottom: '2px solid #e5e7eb',
                marginBottom: 0,
                marginTop: 0,
                paddingBottom: 8,
                fontWeight: 500,
                fontSize: 16,
                color: '#444'
              }}>
                <span>Repeat</span>
                <span style={{ color: '#888', fontWeight: 400 }}>
                  {repeatEnabled
                    ? selectedCycle === 'Weekly'
                      ? 'Every week >'
                      : selectedCycle === 'Daily'
                        ? 'Every day >'
                        : 'Every month >'
                    : ''}
                </span>
              </div>
            </div>
            {/* Tag Section */}
            <div className="flex-1 p-2">
              <div style={{
                background: '#fff',
                borderRadius: '8px 8px 0 0',
                padding: '12px 16px 8px 16px',
                borderBottom: '2px solid #e5e7eb'
              }}>
                <span style={{
                  color: '#444',
                  fontWeight: 500,
                  fontSize: '15px'
                }}>Set a tag for your task</span>
              </div>
              {/* Tag Chips and Add More + in the same line, as in image */}
              <div className="mt-2 mb-3" style={{ minHeight: 32 }}>
                {renderTagChips()}
              </div>
            </div>
          </div>
            {/* Submit Button at the bottom right of the page */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: "40px"
          }}>
            <button
              type="submit"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 2px 8px #00000013',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                border: '1.5px solid #ddd',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                marginRight: 10
              }}
              className="hover:shadow-lg"
            >
              {/* Only single outer round shape, no inner round */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle fill="white" stroke="#e3e3e3" strokeWidth="2"/>
                <polyline 
                  points="10,17 15,22 22,12"
                  fill="none"
                  stroke="black"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;