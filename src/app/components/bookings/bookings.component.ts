import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { Hotel } from "../../models/hotel.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.component.html",
  styleUrls: ["./bookings.component.css"],
})
export class BookingsComponent implements OnInit {
  user: User;
  displayBookingCarts: {
    hotel: Hotel;
    roomsQuantity: number;
    fromDate: string;
    toDate: string;
    totalAmount: number;
    deleted: boolean;
  }[] = [];

  constructor(private aroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.aroute.snapshot.data["res2"].user;
    this.displayBookingCarts = this.aroute.snapshot.data["res2"].res.map(booking => ({ ...booking, deleted: false }));
  }

  printBooking() {
    window.print();
  }

  deleteBooking(index: number) {
    this.displayBookingCarts[index].deleted = true;
  }

}