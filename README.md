# 🚀 **AI-Powered Breast Cancer Prediction & Analysis (Machine Learning Project)**

An end-to-end machine learning project that predicts breast cancer based on numerical tumor-feature measurements. This project includes data preprocessing, model training, evaluation, and interactive prediction using Python.

---

## 🔬 **📌 Project Overview**

Breast cancer is one of the most common cancers, and early prediction helps save lives.
This AI/ML project analyzes tumor feature measurements such as:

* Radius Mean
* Texture Mean
* Perimeter Mean
* Area Mean
* Smoothness Mean
* Compactness Mean
* Concavity Mean
* Symmetry Mean
  ...and more.

Using this data, the model predicts whether the tumor is:

* **0 → Benign (Non-cancerous)**
* **1 → Malignant (Cancerous)**

---

## 🧠 **✨ Features**

✔ Machine Learning classification model
✔ Data cleaning & preprocessing
✔ Train-test split, scaling & evaluation
✔ High-accuracy prediction
✔ Custom input prediction function
✔ CSV/Excel dataset support
✔ Ready to deploy or extend into UI / API
✔ Jupyter Notebook with full explanation

---

## 🗂 **Project Structure**

```
Cancer_AnalysisUsing_AI/
│── data/
│    ├── cancer_data.csv
│── notebooks/
│    ├── cancer_analysis.ipynb
│── src/
│    ├── model_training.py
│    ├── prediction.py
│── saved_models/
│    ├── cancer_model.pkl
│── README.md
│── requirements.txt
```

---

## 🛠 **Tech Stack**

| Component | Technology                                       |
| --------- | ------------------------------------------------ |
| Language  | Python                                           |
| Libraries | Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn |
| Model     | Logistic Regression / RandomForestClassifier     |
| Tools     | Jupyter Notebook                                 |

---

## 📊 **Model Workflow**

1️⃣ Load & clean dataset
2️⃣ Visualize missing values & correlation
3️⃣ Split dataset into train & test
4️⃣ Apply StandardScaler
5️⃣ Train ML model
6️⃣ Evaluate using accuracy, confusion matrix
7️⃣ Predict cancer type using user inputs

---

## 📈 **Model Performance (Example)**

| Metric    | Score |
| --------- | ----- |
| Accuracy  | 96%   |
| Precision | 95%   |
| Recall    | 94%   |
| F1 Score  | 95%   |

(Values depend on your dataset and model)

---

## 📥 **How to Run the Project**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Vinothkumar-SV/Cancer_AnalysisUsing_AI.git
cd Cancer_AnalysisUsing_AI
```

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run Jupyter Notebook

```bash
jupyter notebook
```

Open:

```
notebooks/cancer_analysis.ipynb
```

### 4️⃣ Run prediction script

```bash
python src/prediction.py
```

---

## 🧪 **Make a Custom Prediction (Example)**

```python
from prediction import predict_cancer

data = {
    "radius_mean": 30,
    "texture_mean": -0.01,
    "perimeter_mean": -0.01,
    "area_mean": -0.01,
    "smoothness_mean": 0.005,
    "compactness_mean": -0.003,
    "concavity_mean": 0.007,
    "concave_points_mean": 0.005,
    "symmetry_mean": 0.015
}

result = predict_cancer(data)
print("Prediction:", result)
```

Output:

```
Prediction: Malignant (Cancer)
```

---

## 🎯 **Future Enhancements**

🟦 Add a web UI using Streamlit or Gradio
🟦 Deploy model on AWS / Render
🟦 Add SHAP explainability for feature importance
🟦 Integrate database for patient history
🟦 Add auto-ML support

---

## 🤝 **Contributions**

Pull requests are welcome!
If you'd like to improve the model, add features, or optimize code, feel free to contribute.

---

## ⭐ **If you like this project, give it a STAR on GitHub!** ⭐

Your support motivates more projects like this ❤️
