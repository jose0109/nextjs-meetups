import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

// With getStaticProps next will pre generate a dynamic page
// for certain Ids, but what happens if a user enter a id value
// at runtime for which we didnt pre generates a page during build
// They will see a 404 error

// This tells next for which dynamic parameters a page should
// be pre generated

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://martinezj:01091995@cluster0.u62hs.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // Finding all objects {}, which fields to be extracted {_id:1}
  // <field>:<1 or true // 0 or false>

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  // All dynamic segment values for which we want to pre generate
  return {
    // Array would be generated dynamically
    fallback: "blocking",
    // Fallback true (next tries to generate on the fly another page)
    // blocking tell next to wait untill the page is pre generated and then stores it in cache
    // False tells next to throw 404 meaning we are specyfing all of
    // our paths in this object
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // paths:
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
};

// A page is pre generated during the build process
// Runs on the dev server side

export const getStaticProps = async (context) => {
  // Fetch data for a single meetup

  // Identifier between brackets, this is a dynamic page
  // hence we need the meeting ID
  // We cant use hooks here

  // Context parameter
  const meetupId = context.params.meetupId;

  // console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://martinezj:01091995@cluster0.u62hs.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    // Props passed to the meetupDetails component
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
