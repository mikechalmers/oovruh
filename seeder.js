import connectDB from '/middleware/mongoose';
import Artwork from '/models/artwork';

const seedWorks = [
  {
    title: 'Dawson',
    year: '1987',
    // id: 'cya',
    images: {
      uri: "https://oovruh.s3.eu-west-2.amazonaws.com/next-s3-uploads/2db92d8b-9f65-493e-a1a5-933f68d556c6/MOX_Coke_II_small_xn.jpg",
      height: 500,
      width: 400,
    },
  },
  {
    title: 'Pacey',
    year: '1947',
    // id: 'hiz',
    images: {
      uri: "https://oovruh.s3.eu-west-2.amazonaws.com/next-s3-uploads/4869bf26-7104-4b3e-a27b-258891854f5e/6ed8c950504990056c8b897180c26283.jpg",
      height: 500,
      width: 400,
    },
  },
  {
    title: 'Audrey',
    year: '1994',
    // id: 'bye',
    images: {
      uri: "https://oovruh.s3.eu-west-2.amazonaws.com/next-s3-uploads/2db92d8b-9f65-493e-a1a5-933f68d556c6/MOX_Coke_II_small_xn.jpg",
      height: 500,
      width: 400,
    },
  },
];

const seedDB = async () => {
  await Artwork.deleteMany({});
  console.log('🚫 CLEARED: db: oovruh collection: works')
  await Artwork.insertMany(seedWorks);
  console.log('✅ DATA ADDED: db: oovruh collection: works')
};

seedDB()
  .then(() => {
    console.log('💯 gonna close connection now kbye');
  })
  .catch((err) => {console.log('uh oh', err)})


export default connectDB(seedDB);
