import studentModel from "../model/student.model.js";
import { faker } from "@faker-js/faker";

const generateStudents = async (num = 50) => {
  try {
    const promises = [];

    for (let i = 0; i < num; i++) {
      const studentData = studentModel.create({
        name: faker.person.fullName(),
        reg_no: faker.string.alpha({ length: 8 }).toUpperCase(),
        email: faker.internet.email().toLowerCase(),
        age: faker.number.int({ min: 10, max: 20 }),
        gender: faker.helpers.arrayElement(["Male", "Female"]),
        roll: faker.number.int({ min: 1, max: 60 }).toString(),
        class_name: faker.helpers.arrayElement(["10", "11", "12"]),
        section: faker.helpers.arrayElement(["A", "B", "C"]),
        address: faker.location.streetAddress(),
        phone: faker.phone.number("+91 ###### ####"),
        password: "password", // default password
        image: {
          public_id: faker.string.uuid(),
          secure_url: faker.image.avatar(),
        },
        userRole: "student",
      });
      console.log("insereted ",i,studentData)
      promises.push(studentData);
    }

    await Promise.all(promises);
    console.log("✅ Students created successfully!");
    process.exit(0);
  } catch (err) {
    console.log("❌ Error:", err.message);
    process.exit(1);
  }
};

generateStudents();
