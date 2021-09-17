
frappe.ui.form.on('Salary Slip',{
    leave_without_pay: function(frm){
		if (frm.doc.employee && frm.doc.start_date && frm.doc.end_date) {
			return frappe.call({
				method: 'process_salary_based_on_leave',
				doc: frm.doc,
				args: {"lwp": frm.doc.leave_without_pay},
				callback: function(r, rt) {
					frm.refresh();
				}
			});
		}
    },

	/*hollidays: function(frm) {
		alert("ahi")
	   if(frm.doc.employee && frm.doc.start_date && frm.doc.end_date){
	   return frappe.call({
			 method: "ringlus.ringlus.doctype.salary_slip.salary_slip.get_holidays",
			 doc: frm.doc,
			 args: {"from_date": frm.doc.from_date,
					"to_date": frm.doc.to_date},     
			 callback: function(r) {
				 if (r.message) {
					frm.set_value('hollidays', r.message);
					alert(r.message.hollidays);
				}
			 }
		});
		}
	},*/


	
	/*compensatory_off: function(frm) {
		if(frm.doc.employee && frm.doc.start_date && frm.doc.end_date){
		return frappe.call({
			method: 'ringlus.ringlus.ringlus.doctype.salary_slip.salary_slip.get_compensatory_off',
			doc: frm.doc,
			args: {"employee": frm.doc.employee,
			        "leave_type": frm.doc.leave_type,
				    "attendance_date": frm.doc.attendance_date},  
			callback: function(r) {
				if(r.message){
					frm.set_value('compensatory_off', r.message);
					alert(r.message.compensatory_off)
				}
			}
		});
	  }
	},*/


	employee: function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_casual_leave",
            args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date}, 
                doctype:"Attendance",
            callback: function(r) { 
				debugger
				var a=r.message[0]['count(leave_type)']
				
                frappe.model.set_value(d.doctype, d.name,"casual_leave",a)
			}
		});



		frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_compensatory_off",
            args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date}, 
                doctype:"Attendance",
            callback: function(r) { 
				debugger
				var a=r.message[0]['count(leave_type)']
				
                frappe.model.set_value(d.doctype, d.name,"compensatory_off",a)
			}
		});


		frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_holidays",
            args: { "from_date": d.start_date,
					"to_date": d.end_date}, 
                doctype:"Leave Application",
            callback: function(r) { 
				debugger
				var a=r.message[0]['count(holiday_date)']
				
                frappe.model.set_value(d.doctype, d.name,"hollidays",a)
			}
		});


        frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
            args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date},
					//"status": d.status },
                doctype:"Attendance",
            callback: function(r) { 
				debugger
				var a=r.message[0]['count(attendance_date)']
				
                frappe.model.set_value(d.doctype, d.name,"present_days",a)
			}
		});
    	if(d.employment_type=="Contract")
	    {



			frappe.call({
				method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
				args: {"employee":d.employee,
					"from_date": d.start_date,
						"to_date": d.end_date},
						//"status": d.status },
					doctype:"Attendance",
				callback: function(r) { 
					debugger
					var a=r.message[0]['count(attendance_date)']
		   
		//    var payment=(d.present_days);
		//    alert(payment)
		   frappe.model.set_value(d.doctype, d.name,"payment_days_on",a)
				}
			});

	    }
	    else
	    {
	       var payment=(30-d.leave_without_pay);
	       frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)

	   }


	// if(d.employment_type== "Apprentice" || "Intern" || "Piecework" || "Commission" || "Probation" || "Part-time" || "Full-time")
	// {
	// 	var payment=(30-d.leave_without_pay);
	// 	frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)	
	// }
	// else if(d.employment_type=="Contract")
	// {
    //     var pay=(d.present_days-0);
	// 	frappe.model.set_value(d.doctype, d.name,"payment_days_on",pay)
	// }
       











},



end_date: function(frm,cdt,cdn){
	var d = locals[cdt][cdn];
	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_casual_leave",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Attendance",
		callback: function(r) { 
			debugger
			var a=r.message[0]['count(leave_type)']
			
			frappe.model.set_value(d.doctype, d.name,"casual_leave",a)
		}
	});



	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_compensatory_off",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Attendance",
		callback: function(r) { 
			debugger
			var a=r.message[0]['count(leave_type)']
		
			frappe.model.set_value(d.doctype, d.name,"compensatory_off",a)
		}
	});


	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_holidays",
		args: { "from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Leave Application",
		callback: function(r) { 
			debugger
			var a=r.message[0]['count(holiday_date)']
			
			frappe.model.set_value(d.doctype, d.name,"hollidays",a)
		}
	});


	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date},
			doctype:"Attendance",
		callback: function(r) { 
			debugger
			var a=r.message[0]['count(attendance_date)']
		
			frappe.model.set_value(d.doctype, d.name,"present_days",a)
		}
	});

	if(d.employment_type == "Contract")
	{
		
		//    var payment=(d.present_days);
		//    alert(payment)
		//    frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)
		frappe.call({
			method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
			args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date},
					//"status": d.status },
				doctype:"Attendance",
			callback: function(r) { 
				debugger
				var a=r.message[0]['count(attendance_date)']
				frappe.model.set_value(d.doctype, d.name,"payment_days_on",a)
				}
			});
		      
		    
	}
	else
	{
	  var payment=(30-d.leave_without_pay);
	  frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)

	}



	// if(d.employment_type== "Apprentice" || "Intern" || "Piecework" || "Commission" || "Probation" || "Part-time" || "Full-time")
	// {
	// 	var payment=(30-d.leave_without_pay);
	// 	frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)	
	// }
	// else if(d.employment_type=="Contrac")
	// {
    //     var pay=(d.present_days-0);
	// 	frappe.model.set_value(d.doctype, d.name,"payment_days_on",pay)
	// }


	// frappe.call({
	// 	method:"ringlus.ringlus.doctype.sales_order.sales_order.get_payment_days",
	// 	args: {"employee":d.employee,
	// 	        "start_date": d.start_date,
	// 			"end_date": d.end_date},
	// 		doctype:"Salary Slip",
	// 	callback: function(r) {
	// 		debugger
	// 		var a=r.message[0]['count(leave_without_pay)']
	// 		if(doc.employment_type == "Full-time"){
	// 			payment_days = (30-a)
	// 			frappe.model.set_value(d.doctype, d.name,"payment_days")
	// 		}
	// 		if(doc.employment_type == "Contract") {
	// 			payment_days = present_days;
	// 			frappe.model.set_value(d.doctype, d.name, "payment_days")
	// 		}

	// }


	// });



















},
























});



