import React from 'react';

function AllRewardsModal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>所有獎項</h3>
        {/* 這裡可以展示更多的所有獎項信息 */}
        <button onClick={onClose}>關閉</button>
      </div>
    </div>
  );
}

export default AllRewardsModal;
