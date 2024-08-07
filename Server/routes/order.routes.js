import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import {UserModel} from "../models/user.js";
import ErrorHandler from "../middlewar/ErrorHandler.js";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import { authorizeRole, isAutheticated } from "../middlewar/auth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { paidCourse } from "../models/course.js";
// creating order
import notificationModel from "../models/notification.js";
import { getAllOrderService, newOrder } from "../service/order.service.js";
const orderRouter = express.Router();

// getting all orders -- admin

orderRouter.get(
  "/get-all-order",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      getAllOrderService(res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

orderRouter.post(
  "/creating-order",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { landingpageId, payment_info } = req.body;
      const user = await UserModel.findById(req.user._id);
      const landingPageCourses = await staticCourse.findById(landingpageId);

      if (!landingPageCourses) {
        return next(new ErrorHandler("Course not Found in landing page", 404));
      }

      const course = await paidCourse.findById(landingPageCourses.courseId.id);

      if (!course) {
        return next(new ErrorHandler("Course not Found", 404));
      }
      const courseID = course._id

      const courseExist = user.courses.some((course) => {
        return course._id.toString() === courseID.toString();
      });

      if (courseExist) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const data = {
        courseId: landingPageCourses._id,
        userId: user._id,
      };

      newOrder(data, res, next);

      const mailData = {
        order: {
          _id: landingPageCourses._id.toString().slice(0, 6),
          userName: user.name,
          name: landingPageCourses.name,
          price: landingPageCourses.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const filePath = path.join(__dirname, "../mails/order-confirmation.ejs");
      const html = await ejs.renderFile(filePath, mailData);

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: " Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }

        user.courses.push(course._id);
        await user.save();

        await notificationModel.create({
          user: user.id,
          title: "New order",
          message: `You have a new order for the course ${landingPageCourses.name}`,
        });

        if (landingPageCourses.purchaces >=0) {
          landingPageCourses.purchaces = landingPageCourses.purchaces + 1;
        }

        await landingPageCourses.save();

        res.status(201).json({ success: true, order: landingPageCourses });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default orderRouter;
