import './App.css';
import {useState} from "react";

function App() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [records, setRecords] = useState([]);
  const [category, setCategory] = useState("income");
  const [amount, setAmount] = useState("");

  function handleCategoryChange(event) {
    setCategory(event.target.value);

  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function addRecord() {
    if (!amount || isNaN(amount)) {
      alert("금액 에러");
      return;
    }

    const valueAmount = parseInt(amount);
    const newRecord = {
      id: Date.now(),
      type: category,
      amount: valueAmount
    };

    setRecords(prevRecords => [...prevRecords, newRecord]);
    setTotalAmount(prev =>
      category === "income" ? prev + valueAmount : prev - valueAmount
    );

    setAmount("");
  }

  function deleteRecord(id, recordAmount, recordType) {
    setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
    setTotalAmount(prev =>
      recordType === "income" ? prev - recordAmount : prev + recordAmount
    );
  }

  return (
    <div className="App">
      <h1>가계부</h1>
      <label>
        <input
          type="radio"
          name="category"
          value="income"
          checked={category === "income"}
          onChange={handleCategoryChange}
        />
        수입
      </label>
      <label>
        <input
          type="radio"
          name="category"
          value="expense"
          checked={category === "expense"}
          onChange={handleCategoryChange}
        />
        지출
      </label>
      <p>
        금액 <input type="text" value={amount} onChange={handleAmountChange} placeholder="숫자만 입력하세요"/>
        <button onClick={addRecord}>등록</button>
      </p>
      <h2>총금액: {totalAmount}원</h2>

      <h3>기록</h3>
      <ul>
        {(() => {
          const list = [];
          for (let i = 0; i < records.length; i++) {
            const record = records[i];
            list.push(
              <li key={record.id}>
                {record.type === "income" ? "(수입)" : "(지출)"} {record.amount}원
                <button onClick={() => deleteRecord(record.id, record.amount, record.type)}>삭제</button>
              </li>
            );
          }
          return list;
        })()}
      </ul>
    </div>
  );
}

export default App;
