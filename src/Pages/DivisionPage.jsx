import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { FaTrash, FaEdit, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DivisionPage = () => {
  const { divisionName } = useParams();
  const [searchText, setSearchText] = useState('');
  const [newInfo, setNewInfo] = useState('');
  const [infoList, setInfoList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [deletingItem, setDeletingItem] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/info/${divisionName}`);
      setInfoList(res.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [divisionName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newInfo) return toast.error("Please enter some info");

    try {
      await axios.post('http://localhost:5000/api/info', {
        division: divisionName,
        text: newInfo,
      });
      toast.success("Info added successfully!");
      setNewInfo('');
      fetchData();
    } catch (err) {
      toast.error("Failed to add info");
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    try {
      await axios.delete(`http://localhost:5000/api/info/${deletingItem._id}`);
      toast.success("Info deleted successfully!");
      setDeletingItem(null);
      fetchData();
    } catch (err) {
      toast.error("Failed to delete info");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedText) return toast.error("Please enter updated text");
    try {
      await axios.patch(`http://localhost:5000/api/info/${editingItem._id}`, {
        text: updatedText,
      });
      toast.success("Info updated successfully!");
      setEditingItem(null);
      setUpdatedText('');
      fetchData();
    } catch (err) {
      toast.error("Failed to update info");
    }
  };

  const highlightMatch = (text) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <span key={index} className="bg-yellow-300 font-bold">{part}</span> : part
    );
  };

  const filtered = infoList.filter((item) =>
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <ToastContainer />

      {/* Title and Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 capitalize pb-2">
          {divisionName} Division
        </h2>
        <button
          onClick={() => navigate('/')}
          className=" font-bold flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-green-800 px-3 py-1 rounded shadow"
        >
          <FaArrowLeft /> Home
        </button>
      </div>

      {/* Search input with icon inside */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search info"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 pl-10 rounded w-full shadow-sm"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Add New Info */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Add new info"
          value={newInfo}
          onChange={(e) => setNewInfo(e.target.value)}
          className="border p-2 rounded w-full shadow-sm"
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">Add</button>
      </form>

      {/* Info List */}
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold mb-3 text-lg">Division Info:</h3>
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-start bg-gray-50 p-3 rounded shadow-sm gap-3"
            >
              <span className="flex-1 break-words">{highlightMatch(item.text)}</span>
              <div className="flex-shrink-0 flex gap-3 mt-1">
                <button
                  onClick={() => setDeletingItem(item)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setUpdatedText(item.text);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Update Modal */}
      {editingItem && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Update Info</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="bg-gray-400 text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">Are you sure you want to delete?</h3>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setDeletingItem(null)}
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionPage;
