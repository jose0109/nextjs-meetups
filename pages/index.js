import React, { useState, useEffect } from "react";
import Head from "next/head";

// If you import something on a page component
// that will only be used on getserversideprops or
// getstaticprops, it wont be included in the client
// side bundle

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Panorama_von_Monaco-La_Turbie.jpg/1920px-Panorama_von_Monaco-La_Turbie.jpg",
    address: "Some Address 5, 1235 Monaco",
    description: "This is a first meetup",
  },
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Panorama_von_Monaco-La_Turbie.jpg/1920px-Panorama_von_Monaco-La_Turbie.jpg",
    address: "Some Address 5, 1235 Monaco",
    description: "This is a 2nd meetup",
  },
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Panorama_von_Monaco-La_Turbie.jpg/1920px-Panorama_von_Monaco-La_Turbie.jpg",
    address: "Some Address 5, 1235 Monaco",
    description: "This is a 3rd meetup",
  },
];

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send http request and fetch data

  //   // There are 2 render cycles, the pre rendered site generated
  //   // by nextjs always takes the 1st render cycle and therefore
  //   // we would have initially an empty array of meetups
  //   // NextJS doesnt wait for the data to be fetched
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// // This function won't run on deployment but on the server
// // after deployment
// export const getServerSideProps = async (context) => {
//   // Helpful with auth, session cookies, etc, nextJS course
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API, etc, any server side code, credentials

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

// This function will be first called before the component
// function, in order to prepare props for this page
// Next will wait for this promise to resolve before the component
// function is executed

export async function getStaticProps() {
  // This code will never execute on the client side
  // Will never reach the machines of your visitors

  // fetch data from an API, DB

  const client = await MongoClient.connect(
    "mongodb+srv://martinezj:01091995@cluster0.u62hs.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // Always need to return an object, with props inside

  // Now data is fetched on the build process before pre rendering
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // To update regularly after deployment
    revalidate: 10,
  };
}

export default HomePage;
